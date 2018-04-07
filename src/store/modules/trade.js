import * as Trade from 'services/api/trade';
import {serverNotification} from 'services/notification';
import {defPeriod} from 'config';
import pairsMock from 'mocks/pairs';
import chartDataMock from 'mocks/chartData';

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
    pairs: pairsMock,
    chart: {
      data: chartDataMock,
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
    // accountTradeHistory: {
    //   total: 0,
    //   items: [],
    // },
    accountTransactionHistory: {
      total: 0,
      items: [],
      offset: 0,
    },
    accountOrders: {
      orders: [],
    },
    orderFilter: '',
    tradeInfo: {
      availableFunds: 0,
      blockedFunds: 0,
      derivedAvailableFunds: 0,
      derivedBlockedFunds: 0,
      equity: 0,
      freeMargin: 0,
      levelFL: 0,
      levelMC: 0,
      makerFee: 0,
      margin: 0,
      marginCall: 0,
      marginLevel: 0,
      maxLeverage: 0,
      orders: [],
    },
    // wallet: [],
    orders: [],
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
    getActiveOrders(state) {
      return state.orders.filter((order) => {
        return order.status === 'Open' || order.status === 'Partially Filled';
      });
    },
    getClosedOrders(state) {
      return state.orders.filter((order) => {
        return order.status === 'Filled' || order.status === 'Cancelled';
      });
    },
    getLastTrades(state) {
      return state.trades;
    },
  },
  mutations: {
    setDesktopData(state, data) {
      state.last = data.last;
      state.high = data.high;
      state.low = data.low;
      state.volume = data.volume;
      state.change = data.change;
      state.bid = data.bid;
      state.ask = data.ask;
      // state.pairs = data.pairs;
    },
    setChartData(state, data) {
      state.chart.data = data;
    },
    // addLastTrade(state, lastTrade) {
    //   const lastTrades = [
    //     [lastTrade[8], lastTrade[7], lastTrade[11], lastTrade[6]],
    //     ...state.trades,
    //   ];
    //   lastTrades.pop(); // delete last trade in history
    //   state.trades = lastTrades;
    // },
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
    setPeriod(state, period) {
      state.chart.period = period;
    },
    setTradeHistory(state, data) {
      state.trades = data.trades;
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
    addNewCandle(state, data) {
      // let open, high, low, close, volume; // eslint-disable-line one-var
      // if (Array.isArray(data)) {
      //   [open, high, low, close, volume] = data;
      // } else {
      //   ({open, high, low, close, volume} = data);
      // }
      // if (state.chart.lastFlag == true) {
        state.chart.data.candles.push(data);
      // } else {
      //   if (!data[5] && state.chart.data.candles) {
      //     let oldArray = state.chart.data.candles;
      //     oldArray.splice(oldArray.length - 1, 1);
      //     state.chart.data.candles = [
      //       ...oldArray,
      //       [open, high, low, close, volume],
      //     ];
      //   }
      // }
      // state.chart.lastFlag = data[5];
    },
    // setOrderList(state, list) {
    //   state.orders = list.data.result.orders;
    // },
    setAccountOrders(state, data) {
      state.accountOrders = data;
    },
    setOrderFilter(state, status) {
      state.orderFilter = status;
    },
    setOrders(state, data) {
      state.orders = data;
    },
    // setAccountTradeHistory(state, list) {
    //   state.accountTradeHistory.total = list.total;
    //   state.accountTradeHistory.items = list.orders;
    // },
    setCancelledOrder(state, id) {
      state.orders.find((item) => item.id === id).status = 'Cancelled';
    },
    setAccountTransactionHistory(state, list) {
      state.accountTransactionHistory.total = list.count;
      state.accountTransactionHistory.items = list.items;
    },
    setOffsetForTransactionHistory(state, num) {
      state.accountTransactionHistory.offset = state.limit * (num - 1);
    },
    addActiveOrder(state, array) {
      state.tradeInfo.orders.push(array);
    },
    setCancelActiveOrder(state, id) {
      let array = [];
      state.tradeInfo.orders.forEach((item, i, arr) => {
        if (item[0] == id) {
          array = item;
          delete state.tradeInfo.orders[i];
          array[7] = 3;
          state.tradeInfo.orders.push(array);
        };
      });
    },
    setFilledActiveOrder(state, data) {
      let array = [];
      state.tradeInfo.orders.forEach((item, i, arr) => {
        if (item[0] == data[0]) {
          array = item;
          delete state.tradeInfo.orders[i];
          array[7] = data[3];
          state.tradeInfo.orders.push(array);
        };
      });
    },
    // setTradeInfo(state, date) {
    //   state.tradeInfo = date;
    // },
    addNewPrices(state, prices) {
      state.volume = prices[0];
      state.change = prices[1];
      state.bid = prices[2];
      state.ask = prices[3];
    },
    // setWallet(state, data) {
    //   state.wallet = data;
    // },
    emptyWallet(state) {
      state.wallet = [];
    },
  },
  actions: {
    // getAccountTradeHistory({commit, state, getters}) {
    //   return Trade.getAccountTradeHistory({
    //     limit: state.limit,
    //     offset: state.accountTradeHistory.offset,
    //     currency: getters.quoteCurrency,
    //     baseCurrency: getters.baseCurrency,
    //     status: state.accountTradeHistory.status,
    //   }
    // ).then((res) => {
    //     commit('setAccountTradeHistory', res.data.result);
    //   }).catch((res) => {
    //     serverNotification(res);
    //   });
    // },
    getAccountTransactionHistory({commit, state, getters}) {
      return Trade.getAccountTransactionHistory({
        limit: state.limit,
        offset: state.accountTransactionHistory.offset,
        status: state.accountTransactionHistory.status,
        baseCurrency: getters.baseCurrency,
        currency: getters.quoteCurrency,
      }
    ).then((res) => {
        commit('setAccountTransactionHistory', res.data.result);
      }).catch((res) => {
        serverNotification(res);
      });
    },
    loadChart({commit, state}) {
      // return Trade.getChart({
      //   period: state.chart.period,
      //   pair: state.pair,
      // }).then((res) => {
      //   commit('setChartData', res.data.result);
      // });
    },
    changeBaseCurrency({commit, dispatch, getters}, currency) {
      const pair = getters.getPairName({
        base: currency,
      });
      commit('setPair', pair);
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
    // getCancelOrder({commit, state}, id) {
    //   return Trade.getCancelOrder(
    //     state.pair,
    //     id
    //   ).then((res) => {
    //     // console.log('Order canceled: ', id);
    //   });
    // },
    // getTradeInfo({commit, state}) {
    //   return Trade.getTradeInfo({
    //     pair: state.pair,
    //   }).then((res) => {
    //     commit('setTradeInfo', res.data.result);
    //   });
    // },
   // getTraderWallet({commit}) {
   //    return Trade.getTraderWallet().then((res) => {
   //      commit('setWallet', res.data.result['BTC']);
   //    });
   //  },
    getTradeHistory({commit}, {page, limit, pair}) {
      return Trade.getTradeHistory({page, limit, pair}).then((response) => {
        commit('setTradeHistory', response.data);
      });
    },
    getAccountOrders({commit}, status) {
      return Trade.getOrders({
        page: 1,
        limit: 20,
        status,
      }).then((response) => {
        commit('setAccountOrders', response.data);
      });
    },
    getOrders({commit}) {
      return Trade.getOrders().then((response) => {
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
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
