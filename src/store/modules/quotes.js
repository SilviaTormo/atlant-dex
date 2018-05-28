import * as Quotes from 'services/api/quotes';
import {serverNotification} from 'services/notification';

export default {
  state: {
    info: [],
  },
  mutations: {
    setQuotesInfo(state, data) {
      state.info = data;
    },
  },
  actions: {
    getQuotesInfo({commit}, {period, currencies}) {
      return Quotes.coinsInfo({
        period,
        currencies,
      }).then((res) => {
        commit('setQuotesInfo', res.data);
      }).catch((res) => {
        serverNotification(res);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
