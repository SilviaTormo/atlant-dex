import axios from 'axios';
import store from 'store';
import {baseURL, timeout} from 'config';
import {serverNotification2} from '../notification';

const instance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const isLoggedIn = store.getters['membership/isLoggedIn'];
  const token = (isLoggedIn) ? store.state.membership.token : null;
  config.headers.Authorization = 'token ' + token;
  return config;
});

instance.interceptors.response.use((response) => {
  store.dispatch('membership/rememberLastAction');
  return response;
}, ({response}) => {
  const {status} = response;
  if (status === 401) {
    store.dispatch('membership/tryReconnect', {response});
  } else {
    serverNotification2(response);
  }
  return Promise.reject(response);
});

export default instance;
