import * as Trade from 'services/api/trade';
import {serverNotification} from 'services/notification';

export default {
  state: {
    pair: 'BTC_USD',
    limit: 23,
    pairs: {},
    pairInfo: {
      ask: 0,
      bid: 0,
      change: 0,
      high: 0,
      highChange: 0,
      last: 0,
      low: 0,
      lowChange: 0,
      makerFee: 0,
      takerFee: 0,
      volume: 0,
    },
    trades: [],
    ohlc: {
      close: 0,
      high: 0,
      low: 0,
      change: 0,
    },
    quotesInfo: [],
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
    getLastTrades(state) {
      return state.trades;
    },
  },
  mutations: {
    setQuotesInfo(state, data) {
      state.quotesInfo = data;
    },
    setPairs(state, data) {
      state.pairs = data;
    },
    setPairInfo(state, data) {
      state.pairInfo = data;
    },
    setPair(state, pair) {
      state.pair = pair;
    },
    setTradeHistory(state, trades) {
      state.trades = trades.data;
    },
    setOHLC(state, data) {
      state.ohlc.high = data.high;
      state.ohlc.low = data.low;
      state.ohlc.close = data.last;
      state.ohlc.change = data.change;
    },
    addNewTrade(state, obj) {
      state.trades.unshift(obj);
    },
    addNewPrices(state, prices) {
      state.volume = prices[0];
      state.change = prices[1];
      state.bid = prices[2];
      state.ask = prices[3];
    },
  },
  actions: {
    getPairs({commit}) {
      return Trade.exchangePairs().then((res) => {
        commit('setPairs', res.data);
      }).catch((res) => {
        serverNotification(res);
      });
    },
    getQuotesInfo({commit}, {period, currencies}) {
      return Trade.coinsInfo({
        period,
        currencies,
      }).then((res) => {
        commit('setQuotesInfo', res.data);
      }).catch((res) => {
        serverNotification(res);
      });
    },
    getPairInfo({getters, commit}) {
      return Trade.exchangePairInfo({
        baseCurrency: getters.baseCurrency,
        quoteCurrency: getters.quoteCurrency,
      }).then((res) => {
        commit('setPairInfo', res.data);
      }).catch((res) => {
        serverNotification(res);
      });
    },
    changeBaseCurrency({commit, dispatch, getters}, currency) {
      const pair = getters.getPairName({
        base: currency,
      });
      commit('setPair', pair);
      dispatch('chart/loadChart', null, {root: true});
    },
    changeQuoteCurrency({commit, dispatch, getters}, currency) {
      const pair = getters.getPairName({
        quote: currency,
      });
      commit('setPair', pair);
      dispatch('chart/loadChart', null, {root: true});
    },
    getTradeHistory({state, commit}) {
      return Trade.getTradeHistory(
        {
          Pair: state.pair,
          CurrencyPairValid: true,
          Page: 1,
          Limit: 20,
        },
      ).then((response) => {
        commit('setTradeHistory', response.data);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
