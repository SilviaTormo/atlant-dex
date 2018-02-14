import * as Membership from 'services/api/membership';
import {serverNotification} from 'services/notification';

export default {
  state: {
    token: '',
    userId: '',
    email: '',
  },
  getters: {
    isLoggedIn: (state) => {
      return state.token !== '';
    },
  },
  mutations: {
    createUser(state, {token, userId, email}) {
      state.token = token;
      state.userId = userId;
      state.email = email;
    },
    flushUser(state) {
      state.token = '';
      state.userId = '';
      state.email = '';
    },
  },
  actions: {
    login({commit}, {email, password}) {
      return Membership.login({
        email,
        password,
      }).then((response) => {
        commit('createUser', response.data.result);
      }).catch((res) => {
        serverNotification(res);
      });
    },
    logout({dispatch}) {
      return Membership.logout().then(() => {
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
        // state.token = res.data.accessToken;
      });
    },
    resetPassword({state}, email) {
      return Membership.requestPasswordRestore(email).catch((res) => {
        serverNotification(res);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
