import * as User from 'services/api/user';

export default {
  state: {
    balance: 317,
    portfolio: {
      balances: [],
      status: 0,
      portfolioValue: 0,
    },
    userCurrencies: ['USD', 'BTC', 'ETH', 'LTC'],
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
    accountTransactionHistory: {
      data: [],
    },
    notificationsOnPage: 10,
    notificationsCounter: 0,
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
    isTFAEnabled(state) {
      return state.security.tfa.enabled;
    },
    getUserBalances(state) {
      return state.portfolio.balances;
    },
    getPortofolioValue(state) {
      return state.portfolio.portfolioValue;
    },
    getPortofolioValue(state) {
      return state.portfolio.portfolioValue;
    },
    getPortofolioStatus(state) {
      return state.portfolio.status;
    },
    getAccountTransactions(state) {
      return state.accountTransactionHistory.data;
    },
    getAccountTransactionItems(state) {
      return state.accountTransactionHistory.totalItems;
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
    changePortfolioStatus(state) {
      state.portfolio.status = 1;
    },
    setBalances(state, data) {
      state.portfolio = data;
    },
    setAccountTransactionHistory(state, data) {
      state.accountTransactionHistory = data;
    },
    setNotificationsCounter(state, data) {
      state.notificationsCounter = data;
    },
  },
  actions: {
    getProfileData({commit}) {
      return User.getProfile().then((res) => {
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
    getBalances({commit}) {
      return User.getBalances().then((response) => {
        commit('setBalances', response.data);
      });
    },
    getAccountTransactionHistory({commit, state, getters}, {page, limit, sortBy, ascending}) {
      return User.getAccountTransactionHistory({
        page,
        limit,
        sortBy,
        ascending,
      }).then((response) => {
        commit('setAccountTransactionHistory', response.data);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
