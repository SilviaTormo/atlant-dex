import * as Verification from '@/services/api/verify';
import VerificationData from '@/models/VerificationData';
import {notification} from '@/services/notification';

export default {
  state: {
    verification: new VerificationData,
    users: {
      accounts: [],
      totalItems: 0,
    },
    limit: 10,
    adminLoggedIn: false,
    applications: {
      verificationRequests: [],
    },
  },
  getters: {
    isAdmin(state) {
      return state.adminLoggedIn;
    },
    users(state) {
      return state.users;
    },
    limit(state) {
      return state.limit;
    },
    latestRequest(state) {
      return state.applications.verificationRequests[state.applications.verificationRequests.length - 1];
    },
  },
  mutations: {
    setVerificationData(state, data) {
      state.verification = new VerificationData(data);
    },
    loginAdmin(state) {
      state.adminLoggedIn = true;
    },
    setUserList(state, data) {
      state.users = data;
    },
    setUserApplications(state, data) {
      state.applications = data;
    },
    setVerificationStatus(state, status) {
      state.applications.verificationRequests[state.applications.verificationRequests.length - 1].status = status;
    },
  },
  actions: {
    verifyTierOne({}, data) {
      Verification.tierOneVerify(data)
      .then(() => {
        notification({
          title: 'Success:',
          text: 'Data was successfully sent',
          type: 'success',
        });
      });
    },
    getLastVerification({commit}) {
      Verification.getLastVerification().then((response) => {
        commit('setVerificationData', response.data);
      });
    },
    adminLogin({commit, dispatch}, {login, password}) {
      Verification.moderatorSignin({login, password}).then((res) => {
        commit('loginAdmin');
        commit('membership/createUser', {
          accessToken: res.data.accessToken,
          refreshTokenCode: res.data.refreshToken,
        }, {root: true});
        dispatch('membership/refreshToken', '', {root: true});
        dispatch('getUserList');
      });
    },
    approveVerification({commit}, requestId) {
      Verification.approveVerification(requestId).then(() => {
        commit('setVerificationStatus', 1);
      });
    },
    rejectVerification({commit}, {verificationId, reason}) {
      Verification.rejectVerification({verificationId, reason}).then(() => {
        commit('setVerificationStatus', 2);
      });
    },
    getUserList({state, commit}, page) {
      Verification.getUserList({
        page,
        limit: state.limit,
      }).then((response) => {
        commit('setUserList', response.data);
      });
    },
    getUserApplication({commit}, userId) {
      Verification.getUserApplication(userId).then((response) => {
        commit('setUserApplications', response.data);
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
