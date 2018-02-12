import * as Membership from 'services/api/membership';

export default {
  state: {
    token: '',
    userId: undefined,
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
    dropUser(state) {
      state.token = '';
      state.userId = undefined;
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
      });
    },
    logout({commit}) {
      return Membership.logout().then(() => {
        commit('dropUser');
        commit('trade/clearOrders', null, {root: true});
      });
    },
    signup({state}, {email, login, agree}) {
      Membership.signup({email, login, agree});
    },
    resetPassword({state}, email) {
      return Membership.requestPasswordRestore(email);
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
