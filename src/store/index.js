import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import misc from './modules/misc';
import localization from './modules/localization';
import trade from './modules/trade';
import loader from './modules/loader';
import modal from './modules/modal';
import page from './modules/page';
import user from './modules/user';
import stats from './modules/stats';
import membership from './modules/membership';
import grid from './modules/grid';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    misc,
    localization,
    trade,
    loader,
    modal,
    page,
    user,
    stats,
    membership,
    grid,
  },
  plugins: [createPersistedState({
    paths: [
      'localization.lang',
      'grid.gridData',
      'membership.token',
    ],
  })],
});

export default store;
