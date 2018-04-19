import Vue from 'vue';
import i18n from 'i18n';
import store from 'store';
import router from 'router';
import hub from 'services/hub';
import Vuelidate from 'vuelidate';
import {hubURL} from 'config';

Vue.use(Vuelidate);
Vue.use(hub, hubURL, store.state.membership.token, store.state.trade.pair);

Vue.mixin({
  methods: {
    openReset() {
      store.commit('modal/open', {
        name: 'reset',
      });
    },
    openInDemo() {
      store.commit('modal/open', {
        name: 'inDemo',
      });
    },
    openSignUp() {
      store.commit('modal/open', 'signUp');
    },
    openSignIn() {
      store.commit('modal/open', 'signIn');
    },
  },
});

new Vue({
  el: '#app',
  store,
  i18n,
  router,
  beforeCreate() {
    const icons = require.context('assets/icons', true, /\.(svg)$/);
    icons.keys().forEach(icons);
  },
});
