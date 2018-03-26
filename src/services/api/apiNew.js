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
  console.log('status', status);
  if (status === 401) {
    store.dispatch('membership/tryReconnect');
    // store.dispatch('membership/dropUser');
  }
  return Promise.reject(response);
});

export default instance;
