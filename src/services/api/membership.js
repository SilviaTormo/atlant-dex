import api from './api';

export const login = ({email, password}) => api.post('member/login', {email, password});
export const logout = () => api.get('member/Logout');
export const signup = ({login, email, agree, lang}) => {
  // const qss = qs.stringify({clientID, track_id, r, clickid, pid, sub5}, {addQueryPrefix: true});
  return api.post(`member/RegEmail`, {login, email, agree, lang});
};
export const regCheck = (confirmationCode) => api.put(`member/RegCheck/${confirmationCode}`);
export const regFinish = ({confirmationCode, password}) => api.post(`member/RegFinish/${confirmationCode}`, {password});
export const requestPasswordRestore = (email) => api.post('Member/RequestPasswordRestore', {email});
export const restoreCheck = (confirmationCode) => api.post(`member/PasswordRestoreCheck/${confirmationCode}`);
