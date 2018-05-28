import * as Orders from 'services/api/orders';

export default {
  state: {
    book: {
      status: 0,
      bids: [],
      asks: [],
    },
    orderFilter: '',
    accountOrders: {
      orders: [],
    },
    orders: [],
    limit: 23,
    trades: [],
  },
  getters: {
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
    setOrdersAsks(state, data) {
      const asks = data;
      state.book.asks = asks;
    },
    setOrdersBids(state, data) {
      const bids = data;
      state.book.bids = bids;
    },
    setAccountOrders(state, data) {
      data.orders.forEach((e) => {
        e.trades = {};
      });
      state.accountOrders = data;
    },
    setBook(state, data) {
      state.book = data;
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
    setTradesForOrder(state, data) {
      let arr = state.accountOrders.orders;
      arr.find((item) => item.id === data.orderId).trades = data.trades.trades;
      state.accountOrders.orders = arr;
    },
    setTradeHistory(state, trades) {
      state.trades = trades.data;
    },
    addNewTrade(state, obj) {
      state.trades.unshift(obj);
    },
  },
  actions: {
    getAccountOrders({state, commit}, {page, limit, sortBy, ascending}) {
      return Orders.getOrders({
        page,
        limit,
        sortBy,
        ascending,
        statuses: state.orderFilter,
      }).then((response) => {
        commit('setAccountOrders', response.data);
      });
    },
    getOrders({state, commit, rootState}) {
      return Orders.getOrders({
        pair: rootState.tradeInfo.pair,
        sortby: 'datetime',
        ascending: false,
        limit: 20,
      }).then((response) => {
        commit('setOrders', response.data.orders);
      });
    },
    getOrderBook({rootGetters, commit}, {limit}) {
      return Orders.getOrderBook({
        baseCurrency: rootGetters['tradeInfo/baseCurrency'],
        quoteCurrency: rootGetters['tradeInfo/quoteCurrency'],
        limit,
      }).then((response) => {
        commit('setBook', response.data);
      });
    },
    placeOrder({commit, dispatch}, {isMarketOrder, isSellOrder, baseCurrency, quoteCurrency, price, quantity, isQuantityInBaseCurrency}) {
      return new Promise((resolve, reject) => {
        Orders.placeOrder({
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
      return Orders.cancelOrder({orderId}).then((res) => {
        commit('setCancelledOrder', orderId);
      });
    },
    getTradesForOrder({state, commit}, orderId) {
      return Orders.getTradesForOrder(orderId).then((response) => {
        let data = {
          trades: response.data,
          orderId,
        };
        commit('setTradesForOrder', data);
      });
    },
    getTradeHistory({rootState, commit}) {
      return Orders.getTradeHistory(
        {
          Pair: rootState.tradeInfo.pair,
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
