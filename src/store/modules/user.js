import * as User from 'services/api/user';

export default {
  state: {
    balance: 317,
    userCurrencies: ['USD', 'BTC', 'ETH', 'ATL'],
    account: {
      currency: '',
      email: {
        value: '',
      },
      fullName: {
        value: null,
        verified: false,
      },
      phone: {
        value: null,
        verified: false,
      },
      subscribe: {
        newsletter: false,
        email: false,
        sms: false,
      },
    },
    security: {
      additionalEmail: {
        value: null,
        verified: false,
      },
      tfa: {
        method: '',
      },
    },
  },
  getters: {
  },
  mutations: {
    setProfile(state, data) {
      state.account = data.account;
      state.security = data.security;
    },
    setPrefCurrency(state, data) {
      state.account.currency = data;
    },
    setTFAMethod(state, data) {
      state.security.tfa.enabled = data.enabled;
      state.security.tfa.method = data.method;
      state.security.tfa.phoneNumber = data.contact;
    },
    setPhoneNumber(state, data) {
      state.account.phone.value = data.phone;
      state.account.phone.countryCode = data.countryCode;
    },
    setPhoneVerified(state, isVerified) {
      state.account.phone.verified = isVerified;
    },
  },
  actions: {
    getProfileData({commit}) {
      User.getProfile().then((res) => {
        commit('setProfile', res.data);
      });
    },
    setFullName({state}, data) {
      return new Promise((resolve, reject) => {
        User.changeName(data).then(() => {
          state.account.fullName.value = data;
          return resolve();
        });
      });
    },
    setPhone({commit}, data) {
      return new Promise((resolve, reject) => {
        User.changePhone(data).then(() => {
          commit('setPhoneNumber', data);
          return resolve();
        });
      });
    },
    setAdditionalEmail({state}, data) {
      return new Promise((resolve, reject) => {
        User.changeAdditionalEmail(data).then(() => {
          state.security.additionalEmail.value = data;
          return resolve();
        });
      });
    },
    setPreferredCurrency({state, commit}, currencyCode) {
      if (state.account.currency === currencyCode) return;
      const backUpCurrency = state.account.currency;
      commit('setPrefCurrency', currencyCode);
      return User.changePreferredCurrency(currencyCode)
      .catch((error) => {
        commit('setPrefCurrency', backUpCurrency);
        console.error(error);
      });
    },
    verifyAdditionalEmail({state}, data) {
      return new Promise((resolve, reject) => {
        User.verifyAdditionalEmail(data).then(() => {
          state.security.additionalEmail.verified = true;
          return resolve();
        });
      });
    },
    deposit({state}, {currency, amount}) {
      return User.deposit({currency, amount}).then(() => {
        console.log('successfully deposited', amount, currency);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
