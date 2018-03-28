import axios from 'axios';
import store from 'store';
import {baseURL, timeout} from 'config';

const instance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  store.dispatch('membership/rememberLastAction');
  const isLoggedIn = store.getters['membership/isLoggedIn'];
  const token = (isLoggedIn) ? store.state.membership.token : null;
  config.headers.Authorization = 'token ' + token;
  return config;
});

instance.interceptors.response.use((response) => {
    return response;
}, ({response}) => {
  const {status} = response;
  const hasRefreshToken = store.getters['membership/hasRefreshToken'];
  let timeSinceLastAction = Date.now() - store.getters['membership/getLastAction'];
  if (status === 401 && timeSinceLastAction < 86400000 && hasRefreshToken) {
    store.dispatch('membership/tryReconnect');
    // store.dispatch('membership/dropUser');
  }
  return Promise.reject(response);
});

export default instance;
