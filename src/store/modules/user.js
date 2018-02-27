import * as User from 'services/api/user';

export default {
  state: {
    balance: 317,
    userCurrencies: ['USD', 'BTC', 'ETH', 'ATL'],
    account: {},
    settings: {},
  },
  getters: {
  },
  mutations: {
    setProfile(state, data) {
      state.account = data.account;
      state.settings = data.settings;
    },
    setPrefCurrency(state, data) {
      state.settings.prefferedCurrency = data;
    },
    setTFAMethod(state, data) {
      state.settings.twoFactorAuthenticationMethod = data.method;
      state.settings.twoFactorAuthenticationContact = data.contact;
    },
  },
  actions: {
    getProfileData({commit}) {
      User.getProfile().then((res) => {
        commit('setProfile', res.data);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
