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
    accountTradeHistory: [],
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
      return state.tradeInfo.orders.filter((order) => {
        return order[7] == 0;
      });
    },
    getClosedOrders(state) {
      return state.tradeInfo.orders.filter((order) => {
        return order[7] !== 0;
      });
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
      state.pairs = data.pairs;
    },
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
    setPeriod(state, period) {
      state.chart.period = period;
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
    setOrderList(state, list) {
      state.orders = list.data.result.orders;
    },
    setAccountTradeHistory(state, list) {
      state.accountTradeHistory = list;
    },
    addActiveOrder(state, array) {
      state.tradeInfo.orders.unshift(array);
    },
    setCancelActiveOrder(state, id) {
      state.tradeInfo.orders.forEach((item, i, arr) => {
        (item[0] == id) ? item[7] = 3 : '';
      });
    },
    setFilledActiveOrder(state, id) {
      state.tradeInfo.orders.forEach((item, i, arr) => {
        (item[0] == id) ? item[7] = 2 : '';
      });
    },
    setTradeInfo(state, date) {
      state.tradeInfo = date;
    },
    addNewPrices(state, prices) {
      state.volume = prices[0];
      state.change = prices[1];
      state.bid = prices[2];
      state.ask = prices[3];
    },
  },
  actions: {
    getAccountTradeHistory({commit, state, getters}) {
      return Trade.getAccountTradeHistory({
        limit: 20,
        offset: 0,
        currency: getters.quoteCurrency,
        baseCurrency: getters.baseCurrency,
      }
    ).then((res) => {
        // console.log('getAccountTradeHistory ', res.data.result.orders);
        commit('setAccountTradeHistory', res.data.result.orders);
      });
    },
    getPlaceMarket({commit, state}, {amount, base_cur_amount, side}) {
      return Trade.getPlaceMarket(
      state.pair,
      {
        amount: amount,
        base_cur_amount: base_cur_amount,
        side: side,
      }
    ).then((res) => {
        console.log('getPlaceMarket ok! Amount: ', res);
      });
    },
    getPlaceLimit({commit, state}, {amount, price, side}) {
      return Trade.getPlaceLimit(
        state.pair,
        {
          amount,
          price,
          side,
      }).then((res) => {
        console.log('getPlaceLimit ok! Amount: ', res);
      });
    },
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
    getCancelOrder({commit, state}, id) {
      return Trade.getCancelOrder(
        state.pair,
        id
      ).then((res) => {
        console.log('Order canceled: ', id);
      });
    },
    getTradeInfo(state) {
      return Trade.getTradeInfo({
        pair: state.pair,
      }).then((res) => {
        console.log('getTradeInfo: ', res);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
