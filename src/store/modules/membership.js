import * as Membership from 'services/api/membership';
import {serverNotification} from 'services/notification';

export default {
  state: {
    token: '',
    userId: '',
    login: '',
    email: 'user@mail.com',
  },
  mutations: {
    createUser(state, {token, userId, login, email}) {
      state.token = token;
      state.userId = userId;
      state.login = login;
      state.email = email;
    },
    flushUser(state) {
      state.token = '';
      state.userId = '';
      state.login = '';
      state.email = '';
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return state.token !== '';
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
    signup({state}, {email, termsaccepted, password}) {
      Membership.signup({
        email,
        termsaccepted,
        password,
      }).catch((res) => {
        serverNotification(res);
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
