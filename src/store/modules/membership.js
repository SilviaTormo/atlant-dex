import * as Membership from 'services/api/membership';

export default {
  state: {
    token: '',
    userId: 0,
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
      state.userId = 0;
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
      });
    },
    signup({state}, {email, login}) {
      console.log('attempt signup', email, login);
      Membership.signup({email, login});
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
