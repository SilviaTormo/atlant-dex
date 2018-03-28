import {getScreenType} from 'services/misc';
import {sidebarSections} from 'config';

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
    section(state, getters, rootState, rootGetters) {
      // Return section from state if user logged in
      if (rootGetters['membership/isLoggedIn']) {
        return state.section;
      } else {
        // Get current section object by state
        const currentSection = sidebarSections.find((sect) => sect.name === state.section);
        // If it should show when user logout
        if (currentSection && currentSection.isShowOnLogout) {
          // return it
          return state.section;
        } else {
          // Otherwise return first section which can show
          return sidebarSections.find((sect) => sect.isShowOnLogout).name;
        }
      }
    },
  },
  mutations: {
    updateScreenType(state) {
      state.screenType = getScreenType();
    },
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    setSidebar(state, showSidebar) {
      state.showSidebar = showSidebar;
    },
    setSection(state, section) {
      state.section = section;
      if (state.showSidebar === false) state.showSidebar = true;
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
