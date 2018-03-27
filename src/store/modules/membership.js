import * as Membership from 'services/api/membership';

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
    login({commit, dispatch}, {email, password}) {
      return Membership.login({
        email,
        password,
      }).then((response) => {
        commit('createUser', response.data);
        dispatch('refreshToken');
      });
    },
    logout({dispatch, state}) {
      return Membership.logout(state.refreshToken).then(() => {
        dispatch('dropUser');
      });
    },
    dropUser({commit}) {
      commit('flushUser');
      // commit('trade/clearOrders', null, {root: true});
      commit('trade/emptyWallet', null, {root: true});
    },
    regFinish({state}, code) {
      return Membership.regFinish(code).then((res) => {
        commit('createUser', response.data);
      });
    },
    refreshToken({state, commit, dispatch}) {
      setTimeout(() => {
        return Membership.refreshToken({
          grantType: 'RefreshToken',
          refreshToken: state.refreshToken,
          email: state.email,
        }).then((response) => {
          commit('createUser', response.data);
          dispatch('refreshToken');
        });
      }, 1500000);
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
