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
    book: {
      status: 0,
      bids: [],
      asks: [],
    },
    ohlc: {
      close: 0,
      high: 0,
      low: 0,
      change: 0,
    },
    accountOrders: {
      orders: [],
    },
    orderFilter: '',
    orders: [],
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
    getActiveOrders(state) {
      return state.orders.filter((order) => {
        return order.status === 0 || order.status === 1;
      });
    },
    getClosedOrders(state) {
      return state.orders.filter((order) => {
        return order.status === 2 || order.status === 3;
      });
    },
    getAccountOrders(state) {
      return state.accountOrders.orders;
    },
    getAccountOrderFilter(state) {
      return state.orderFilter;
    },
    getAccountOrdersItems(state) {
      return state.accountOrders.totalItems;
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
    setTradeHistory(state, trades) {
      state.trades = trades.data;
    },
    setBook(state, data) {
      state.book = data;
    },
    setOHLC(state, data) {
      state.ohlc.high = data.high;
      state.ohlc.low = data.low;
      state.ohlc.close = data.last;
      state.ohlc.change = data.change;
    },
    setAccountOrders(state, data) {
      data.orders.forEach((e) => {
        e.trades = {};
      });
      state.accountOrders = data;
    },
    setOrderFilter(state, status) {
      state.orderFilter = status;
    },
    setOrders(state, data) {
      state.orders = data;
    },
    cleanOrders(state) {
      state.orders = [];
      state.accountOrders = {
        orders: [],
      };
    },
    setCancelledOrder(state, id) {
      state.orders.find((item) => item.id === id).status = 3;
    },
    addActiveOrder(state, obj) {
      state.orders.unshift(obj);
      state.book.status = 1;
    },
    changeOrderStatus(state, obj) {
      let order = state.orders.find((item) => item.id === obj.id);
      if (order) {
        order.leavesQuantity = obj.leavesQuantity;
        order.status = obj.status;
      }
      state.book.status = 1;
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
    setTradesForOrder(state, data) {
      let arr = state.accountOrders.orders;
      arr.find((item) => item.id === data.orderId).trades = data.trades.trades;
      state.accountOrders.orders = arr;
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
    getAccountOrders({state, commit}, {page, limit, sortBy, ascending}) {
      return Trade.getOrders({
        page,
        limit,
        sortBy,
        ascending,
        status: state.orderFilter,
      }).then((response) => {
        commit('setAccountOrders', response.data);
      });
    },
    getOrders({state, commit}) {
      return Trade.getOrders({
        pair: state.pair,
        sortby: 'datetime',
        ascending: false,
        limit: 20,
      }).then((response) => {
        commit('setOrders', response.data.orders);
      });
    },
    getOrderBook({getters, commit}, {limit}) {
      return Trade.getOrderBook({
        baseCurrency: getters.baseCurrency,
        quoteCurrency: getters.quoteCurrency,
        limit,
      }).then((response) => {
        commit('setBook', response.data);
      });
    },
    placeOrder({commit, dispatch}, {isMarketOrder, isSellOrder, baseCurrency, quoteCurrency, price, quantity, isQuantityInBaseCurrency}) {
      return new Promise((resolve, reject) => {
        Trade.placeOrder({
          isMarketOrder,
          isSellOrder,
          baseCurrency,
          quoteCurrency,
          price,
          quantity,
          isQuantityInBaseCurrency,
        }).then((response) => {
          return resolve();
        });
      });
    },
    cancelOrder({commit}, orderId) {
      return Trade.cancelOrder({orderId}).then((res) => {
        commit('setCancelledOrder', orderId);
      });
    },
    getTradesForOrder({state, commit}, orderId) {
      return Trade.getTradesForOrder(orderId).then((response) => {
        let data = {
          trades: response.data,
          orderId,
        };
        commit('setTradesForOrder', data);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
