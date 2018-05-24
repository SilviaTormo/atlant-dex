import * as Membership from 'services/api/membership';

export default {
  state: {
    token: '',
    refreshToken: '',
    userId: '',
    email: '',
    lastAction: '',
  },
  getters: {
    isLoggedIn: (state) => {
      return state.token !== '';
    },
    hasRefreshToken(state) {
      return state.refreshToken != '';
    },
    getLastAction(state) {
      return state.lastAction;
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
    setLastActionTime(state) {
      state.lastAction = Date.now();
    },
  },
  actions: {
    login({commit, dispatch}, {email, password}) {
      return Membership.login({
        email,
        password,
      }).then((response) => {
        commit('createUser', response.data);
        dispatch('setRefreshTimeout');
      });
    },
    logout({dispatch, state}) {
      return Membership.logout(state.refreshToken).then(() => {
        dispatch('dropUser');
      });
    },
    tryReconnect({getters, dispatch}) {
      return new Promise((resolve, reject) => {
        console.log('called tryReconnect');
        if (getters.hasRefreshToken) {
          dispatch('refreshToken').then(() => {
            return resolve('success');
          }).catch(() => {
            dispatch('dropUser');
            return reject('fail');
          });
        } else {
          dispatch('dropUser');
          return reject();
        };
      });
    },
    dropUser({commit}) {
      commit('flushUser');
      commit('trade/cleanOrders', null, {root: true});
      commit('user/cleanAfterLogout', null, {root: true});
      commit('modal/open', {name: 'signIn'}, {root: true});
    },
    regFinish({state, commit}, code) {
      return Membership.regFinish(code).then((response) => {
        commit('createUser', response.data);
      });
    },
    setRefreshTimeout({state, commit, dispatch}) {
      setTimeout(() => {
        dispatch('refreshToken').then(() => {
          dispatch('setRefreshTimeout');
        });
      }, 1800000);
    },
    refreshToken({state, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        let timeSinceLastAction = Date.now() - state.lastAction;
        if (timeSinceLastAction > 86400000) {
          console.log('inactive user');
          console.log('time since last action', timeSinceLastAction);
          return reject();
        } else {
          Membership.refreshToken({
            grantType: 'RefreshToken',
            refreshToken: state.refreshToken,
            email: state.email,
          }).then((response) => {
            commit('createUser', response.data);
            console.log('successful reconnect');
            console.log('time since last action', timeSinceLastAction);
            return resolve(response);
          }).catch((response) => {
            console.log(response);
            console.log('time since last action', timeSinceLastAction);
            return reject(response);
          });
        };
      });
    },
    rememberLastAction({getters, commit}) {
      if (getters.isLoggedIn) commit('setLastActionTime');
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
