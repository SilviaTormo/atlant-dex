import * as Trade from 'services/api/trade';
import {serverNotification} from 'services/notification';
import {defPeriod} from 'config';
import {debounce} from 'services/misc';
// import pairsMock from 'mocks/pairs';

export default {
  state: {
    pair: 'LTC_BTC',
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
    chart: {
      data: {
        candles: [],
      },
      period: defPeriod,
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
  },
  getters: {
    baseCurrency(state) {
      return state.pair.split('_')[0];
    },
    quoteCurrency(state) {
      return state.pair.split('_')[1];
    },
    candles(state) {
      return state.chart.data.candles;
    },
    candlePeriod(state) {
      const {candles} = state.chart.data;
      return candles.length && candles[0].period;
    },
    candlePeriodInMs(state, getters) {
      return new Date(`1970-01-01T${getters.candlePeriod}Z`).getTime();
    },
    lastCandle(state, getters) {
      return getters.candles[getters.candles.length - 1];
    },
    lastCandleOpenTime(state, getters) {
      const {lastCandle, candles, candlePeriodInMs} = getters;
      if (!candles.length) return 0;
      let time = new Date(lastCandle.candleOpen).getTime();
      // Fix when last candle has wrong open time
      if (time < 0) {
        time = new Date(candles[candles.length - 2].candleOpen).getTime() + candlePeriodInMs;
      }
      return time;
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
    getAccountOrders(state) {
      return state.accountOrders.orders;
    },
    getAccountOrderFilter(state) {
      return state.orderFilter;
    },
    getLastTrades(state) {
      return state.trades.slice(0, 21);
    },
  },
  mutations: {
    setChartData(state, data) {
      Object.assign(state.chart.data, data);
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
    setCandles(state, candles) {
      state.chart.data.candles = candles;
    },
    // setOrderList(state, list) {
    //   state.orders = list.data.result.orders;
    // },
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
    },
    // setAccountTradeHistory(state, list) {
    //   state.accountTradeHistory.total = list.total;
    //   state.accountTradeHistory.items = list.orders;
    // },
    setCancelledOrder(state, id) {
      state.orders.find((item) => item.id === id).status = 'Cancelled';
    },
    addActiveOrder(state, obj) {
      state.orders.unshift(obj);
      state.book.status = 1;
    },
    changeOrderStatus(state, obj) {
      // console.table(obj);
      state.orders.forEach((item, i, arr) => {
        if (item.status == 'Filled') return;
        if (item.id == obj.orderId) {
          item.status = obj.status;
          if (typeof obj.leavesQuantity != 'undefined') {
            item.leavesQuantity = obj.leavesQuantity;
          }
        };
      });
      state.book.status = 1;
    },
    addNewTrade(state, obj) {
      obj.amount = obj.quantity;
      state.trades.unshift(obj);
    },
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
    setTradesForOrder(state, data) {
      let arr = state.accountOrders.orders;
      arr.find((item) => item.id === data.orderId).trades = data.trades.trades;
      state.accountOrders.orders = arr;
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
    getPairs({commit}) {
      return Trade.exchangePairs().then((res) => {
        commit('setPairs', res.data);
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

    loadChart: debounce(function({commit, state}) {
      return Trade.getCandlesCollection({
        period: state.chart.period,
        pair: state.pair,
      }).then((res) => {
        commit('setChartData', res.data);
      });
    }, 50),
    changeBaseCurrency({commit, dispatch, getters}, currency) {
      const pair = getters.getPairName({
        base: currency,
      });
      commit('setPair', pair);
      dispatch('loadChart');
    },
    changeQuoteCurrency({commit, dispatch, getters}, currency) {
      const pair = getters.getPairName({
        quote: currency,
      });
      commit('setPair', pair);
      dispatch('loadChart');
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
    getTradeHistory({commit}) {
      return Trade.getTradeHistory().then((response) => {
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
      return Trade.getOrders({
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
    addBundleEmptyCandles({commit, getters}, bundleEmptyCandles) {
      const newCandles = getters.candles.concat(bundleEmptyCandles);
      commit('setCandles', newCandles);
    },
    addNewCandle({commit, getters}, newCandle) {
      const {candles, lastCandleOpenTime} = getters;
      const lastCandleIndex = candles.length - 1;
      let newCandles = candles;
      console.log('newCandle: ', newCandle);
      if ((new Date(newCandle.candleOpen).getTime() - lastCandleOpenTime) < 1000) {
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
