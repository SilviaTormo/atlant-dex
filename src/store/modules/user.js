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
      fullName: '',
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
    notifications: {
      data: [],
      totalItems: 0,
    },
    notificationsOnPage: 5,
  },
  getters: {
    getNotifications(state) {
      return state.notifications.data;
    },
    getNotificationItems(state) {
      return state.notifications.totalItems;
    },
    getNotificationsOnPage(state) {
      return state.notificationsOnPage;
    },
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
    setNotifications(state, data) {
      state.notifications = data;
    },
    setSubscribeNewsletter(state, isEnable) {
      state.account.subscribe.newsletter = isEnable;
    },
  },
  actions: {
    getProfileData({commit}) {
      User.getProfile().then((res) => {
        commit('setProfile', res.data);
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
    setNewsletterSubscription({state, commit}, isEnable) {
      // Prevent useless request
      if (state.account.subscribe.newsletter === isEnable) return;
      const backUpIsEnable = state.account.subscribe.newsletter;
      commit('setSubscribeNewsletter', isEnable);
      return User.changeNewsletterSubscription(isEnable)
      .catch((error) => {
        commit('setSubscribeNewsletter', backUpIsEnable);
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
    getNotificationHistory({state, commit}, {page, sortBy, ascending}) {
      return User.getNotificationHistory({
        page,
        limit: state.notificationsOnPage,
        sortBy,
        ascending,
      }).then((response) => {
        commit('setNotifications', response.data);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
