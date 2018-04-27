export default {
  state: {
    name: '',
    data: {},
    previusPageForTables: '',
  },
  mutations: {
    open(state, {name, data}) {
      if (state.name != name && state.name !== 'myOrders' && name !== 'myOrders') {
        state.previusPageForTables = state.name;
      }

      state.name = name;
      state.data = data;
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
    currentPage: (state) => state.name,
    isProfileOpened(state) {
      return state.name !== '';
    },
    isProfilePageOpened(state) {
      return state.name === 'accountInformation' || state.name === 'verification';
    },
    isSettingPageOpened(state) {
      return state.name === 'securitySettings' || state.name === 'securityLog';
    },
    isPageHistoryOpened(state) {
      return state.name === 'transactionHistory' || state.name === 'myOrders';
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
