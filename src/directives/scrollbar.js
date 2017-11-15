import PerfectScrollbar from 'perfect-scrollbar';

export default {
  inserted(el) {
    PerfectScrollbar.initialize(el);
  },
  componentUpdated(el) {
    PerfectScrollbar.update(el);
  },
};
