export default {
  state: {
    ask: 0,
    bid: 0,
    change: 0,
    high: 0,
    last: 0,
    low: 0,
    volume: 0,
  },
  mutations: {
    setStats(state, {ask, bid, change, high, last, low, volume}) {
      state = Object.assign(state, {ask, bid, change, high, last, low, volume});
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
