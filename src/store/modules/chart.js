import * as Trade from 'services/api/trade';
// import {serverNotification} from 'services/notification';
import {defPeriod} from '@/config';
import {debounce} from 'services/misc';
// import dataFromTradeModule from './trade';

export default {
  state: {
    data: {
      candles: [],
    },
    newCandles: [],
    period: defPeriod,
  },
  getters: {
    candles(state) {
      return state.data.candles;
    },
    isCurrentPeriod: (state) => (period) => {
      return state.period === period;
    },
    candlePeriod(state) {
      const {candles} = state.data;
      return candles.length && candles[0].period;
    },
    candlePeriodInMs(state, getters) {
      return getters.getCandlePeriodInMs();
    },
    lastCandle(state, getters) {
      return getters.candles[getters.candles.length - 1];
    },
    lastCandleOpenTime(state, getters) {
      return getters.getLastCandleOpenTime();
    },
    getCandlePeriodInMs: (state, getters) => (candlePeriod = getters.candlePeriod) => {
      return new Date(`1970-01-01T${candlePeriod}Z`).getTime();
    },
    getLastCandleOpenTime: (state, getters) => (
      candles = getters.candles,
      lastCandle = getters.lastCandle,
    ) => {
      if (!candles.length) return 0;
      let time = Date.parse(lastCandle.candleOpen);
      // Fix when last candle has wrong open time
      if (time < 0) {
        const candlePeriodInMs = getters.getCandlePeriodInMs(candles[0].period);
        time = Date.parse(candles[candles.length - 2].candleOpen) + candlePeriodInMs;
      }
      return time;
    },
    getEmptyCandle: (state, getters) => (
      lastCandle = getters.lastCandle,
      candlePeriodInMs = getters.candlePeriodInMs
    ) => {
      const {close} = lastCandle;
      const lastCandleOpenTime = (lastCandle === getters.lastCandle) ?
        getters.lastCandleOpenTime
        : new Date(lastCandle.candleOpen).getTime();

      return Object.assign({}, lastCandle, {
        high: close,
        low: close,
        open: close,
        volume: 0,
        candleOpen: new Date(lastCandleOpenTime + candlePeriodInMs).toISOString(),
      });
    },
    getActualizedCandlesCollection: (state, getters) => (candlesCollection) => {
      const lastCandle = candlesCollection[candlesCollection.length - 1];
      const candlePeriodInMs = getters.getCandlePeriodInMs(lastCandle.period);
      const lastCandleOpenTime = getters.getLastCandleOpenTime(candlesCollection, lastCandle);
      const pastTime = new Date().getTime() - lastCandleOpenTime;
      const candleNumber = Math.floor(pastTime / candlePeriodInMs);
      const newCandles = [];
      let baseCandle = lastCandle;
      for (let i = 0; i < candleNumber; i++) {
        baseCandle = getters.getEmptyCandle(baseCandle, candlePeriodInMs);
        newCandles.push(baseCandle);
      }
      return candlesCollection.concat(newCandles);
    },
  },
  mutations: {
    setChartData(state, data) {
      const modifier = data.candles ? {} : {candles: []};
      Object.assign(state.data, data, modifier);
    },
    setCandles(state, candles) {
      state.data.candles = candles;
    },
    setPeriod(state, period) {
      state.period = period;
    },
    addNewCandle(state, candle) {
      if (state.newCandles) {
        state.newCandles.push(candle);
      } else {
        state.newCandles = [candle];
      }
    },
    setNewCandles(state, candles) {
      state.newCandles = candles;
    },
  },
  actions: {
    loadChart: debounce(function({commit, state, dispatch, getters, rootState}) {
      return Trade.getCandlesCollection({
        period: state.period,
        pair: rootState.trade.pair,
      }).then((res) => {
        const candles = getters.getActualizedCandlesCollection(res.data.candles);
        commit('setChartData', Object.assign(res.data, {candles}));
      });
    }, 50),
    changeChartPeriod({commit, dispatch}, period) {
      commit('setPeriod', period);
      return dispatch('loadChart');
    },
    addNewCandle({dispatch, commit}, candle) {
      commit('addNewCandle', candle);
      dispatch('mergeNewCandles');
    },
    mergeNewCandles: debounce(function({dispatch, state, commit}) {
      const {newCandles = []} = state;
      newCandles.forEach((candle) => {
        dispatch('mergeCandleToChart', candle);
      });
      commit('setNewCandles', []);
    }, 100),
    mergeCandleToChart({commit, getters}, newCandle) {
      const {candles, lastCandleOpenTime} = getters;
      const lastCandleIndex = candles.length - 1;
      let newCandles = candles;
      console.log('newCandle: ', newCandle);
      if (candles.length && (new Date(newCandle.candleOpen).getTime() - lastCandleOpenTime) < 1000) {
        console.log('Update last candle');
        newCandles = [...candles.slice(0, lastCandleIndex), newCandle];
      } else {
        console.log('Add new candle');
        newCandles = candles.concat(newCandle);
      }
      commit('setCandles', newCandles);
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
