import * as Membership from 'services/api/membership';
import {serverNotification} from 'services/notification';

export default {
  state: {
    token: '',
    refreshToken: '',
    userId: '',
    email: '',
  },
  getters: {
    isLoggedIn: (state) => {
      return state.token !== '';
    },
  },
  mutations: {
    createUser(state, data) {
      state.token = data.accessToken;
      state.refreshToken = data.refreshTokenCode;
    },
    flushUser(state) {
      state.token = '';
      state.refreshToken = '';
    },
  },
  actions: {
    login({commit}, {email, password}) {
      return Membership.login({
        email,
        password,
      }).then((response) => {
        commit('createUser', response.data);
      }).catch((res) => {
        serverNotification(res);
      });
    },
    logout({dispatch, state}) {
      return Membership.logout(state.refreshToken).then(() => {
        dispatch('dropUser');
      }).catch((res) => {
        serverNotification(res);
      });
    },
    dropUser({commit}) {
      commit('flushUser');
      commit('trade/clearOrders', null, {root: true});
      commit('trade/emptyWallet', null, {root: true});
    },
    regFinish({state}, code) {
      return Membership.regFinish(code).then((res) => {
        commit('createUser', response.data);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
