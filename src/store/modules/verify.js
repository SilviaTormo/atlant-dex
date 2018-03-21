import * as Verification from 'services/api/verify';

export default {
  state: {
    lastVerification: {},
  },
  getters: {},
  mutations: {
    setVerificationData(state, data) {
      state.lastVerification = data;
    },
  },
  actions: {
    verifyTierOne({}, data) {
      Verification.tierOneVerify(data);
    },
    getLastVerification({commit}) {
      Verification.getLastVerification().then((response) => {
        commit('setVerificationData', response.data);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
