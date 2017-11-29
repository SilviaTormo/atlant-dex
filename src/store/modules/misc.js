import {getScreenType} from 'services/misc';

export default {
  state: {
    screenType: '',
    showSidebar: true,
    values: {},
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
    setInput(state, data) {
      state.values[data.name] = data.value;
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
