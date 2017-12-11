import {getScreenType} from 'services/misc';

export default {
  state: {
    screenType: '',
    showSidebar: true,
    section: 'wallet',
  },
  getters: {
    isMobile(state) {
      return state.screenType === 'mobile';
    },
  },
  mutations: {
    updateScreenType(state) {
      state.screenType = getScreenType();
    },
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    setSection(state, section) {
      state.section = section;
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
