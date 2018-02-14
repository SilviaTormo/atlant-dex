import axios from 'axios';
import store from 'store';
import {baseURLOld, timeout} from 'config';

const instance = axios.create({
  baseURL: baseURLOld,
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
    return response;
}, ({response}) => {
  const {status} = response;
  if (status === 401) {
    store.dispatch('membership/dropUser');
  }
  return Promise.reject(response);
});

export default instance;
