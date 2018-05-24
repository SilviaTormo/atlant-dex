import Vue from 'vue';
import i18n from './i18n';
import store from './store';
import router from './router';
import hub from './services/hub';
import Vuelidate from 'vuelidate';
import {hubURL} from './config.js';
import Icon from './components/Icon';

Vue.component('Icon', Icon);
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
  i18n,
  store,
  router,
  created() {
    const icons = require.context('./assets/icons/', true, /\.(svg)$/);
    icons.keys().forEach(icons);
  },
});
