import * as Trade from 'services/api/trade';
import {defPeriod} from 'config';

export default {
  state: {
    pair: 'BTC_ATL',
    last: 0,
    high: 0,
    low: 0,
    volume: 0,
    change: 0,
    bid: 0,
    ask: 0,
    limit: 23,
    pairs: {},
    chart: {
      data: {},
      period: defPeriod,
      lastFlag: false,
    },
    trades: [],
    book: {
      bids: [],
      asks: [],
    },
    ohlc: {
      close: 0,
      high: 0,
      low: 0,
      change: 0,
    },
  },
  getters: {
    baseCurrency(state) {
      return state.pair.split('_')[0];
    },
    quoteCurrency(state) {
      return state.pair.split('_')[1];
    },
    getPairName: (state, getters) => ({base = getters.baseCurrency, quote = getters.quoteCurrency}) => {
      return `${base}_${quote}`;
    },
    isCurrentPeriod: (state) => (period) => {
      return state.chart.period === period;
    },
  },
  mutations: {
    setChartData(state, data) {
      state.chart.data = data;
    },

    addLastTrade(state, lastTrade) {
      const lastTrades = [
        [lastTrade[8], lastTrade[7], lastTrade[11], lastTrade[6]],
        ...state.trades,
      ];
      lastTrades.pop(); // delete last trade in history
      state.trades = lastTrades;
    },
    setOrdersAsks(state, data) {
      const asks = data;
      state.book.asks = asks;
    },
    setOrdersBids(state, data) {
      const bids = data;
      state.book.bids = bids;
    },
    setPair(state, pair) {
      state.pair = pair;
    },
    setLastPrice(state, last) {
      state.last = last;
    },
    setHighPrice(state, high) {
      state.high = high;
    },
    setLowPrice(state, low) {
      state.low = low;
    },
    setVolumePrice(state, volume) {
      state.volume = volume;
    },
    setChangePrice(state, change) {
      state.change = change;
    },
    setBidPrice(state, bid) {
      state.bid = bid;
    },
    setAskPrice(state, ask) {
      state.ask = ask;
    },
    setPeriod(state, period) {
      state.chart.period = period;
    },
    setPairs(state, pairs) {
      state.pairs = pairs;
    },
    setTradeHistory(state, trades) {
      state.trades = trades;
    },
    setBook(state, data) {
      state.book.asks = data.asks;
      state.book.bids = data.bids;
    },
    setOHLC(state, data) {
      state.ohlc.high = data.high;
      state.ohlc.low = data.low;
      state.ohlc.close = data.last;
      state.ohlc.change = data.change;
    },
    addNewCandle(state, data) {
      const open = data[0];
      const high = data[1];
      const low = data[2];
      const close = data[3];
      const volume = data[4];
      if (state.chart.lastFlag == true) {
        state.chart.data.candles.push([open, high, low, close, volume]);
      } else {
        if (!data[5]) {
          let oldArray = state.chart.data.candles;
          oldArray.splice(oldArray.length-1, 1);
          state.chart.data.candles = [
            ...oldArray,
            [open, high, low, close, volume],
          ];
        }
      }

      state.chart.lastFlag = data[5];
    },
  },
  actions: {
    loadChart({commit, state}) {
      return Trade.getChart({
        period: state.chart.period,
        pair: state.pair,
      }).then((res) => {
        commit('setChartData', res.data.result);
      });
    },
    changeQuoteCurrency({commit, dispatch, getters}, currency) {
      const pair = getters.getPairName({
        quote: currency,
      });
      commit('setPair', pair);
      // dispatch('loadChart');
    },
    changeChartPeriod({commit, dispatch}, period) {
      commit('setPeriod', period);
      return dispatch('loadChart');
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
