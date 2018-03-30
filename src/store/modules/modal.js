export default {
  state: {
    name: '',
    data: {
      isDeposit: false,
      currency: '',
    },
  },
  mutations: {
    open(state, {name, data}) {
      state.data = data;
      state.name = name;
    },
    close(state) {
      state.name = '';
      state.data = {};
    },
  },
  getters: {
    isOpened: (state) => (name) => {
      return (name) ? (state.name === name) : (state.name !== '');
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
