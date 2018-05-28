import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import misc from './modules/misc';
import localization from './modules/localization';
import tradeInfo from './modules/tradeInfo';
import chart from './modules/chart';
import quotes from './modules/quotes';
import orders from './modules/orders';
import modal from './modules/modal';
import page from './modules/page';
import user from './modules/user';
import verify from './modules/verify';
import membership from './modules/membership';
import grid from './modules/grid';
import geo from './modules/geo';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    misc,
    localization,
    tradeInfo,
    chart,
    orders,
    quotes,
    modal,
    page,
    user,
    verify,
    membership,
    grid,
    geo,
  },
  plugins: [createPersistedState({
    paths: [
      'grid.gridData',
      'membership.token',
      'membership.userId',
      'membership.refreshToken',
      'membership.email',
      'membership.lastAction',
      'tradeInfo.pair',
      'tradeInfo.pairs',
      'user.account.currency',
    ],
  })],
});

export default store;
