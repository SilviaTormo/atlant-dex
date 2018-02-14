import apiOld from './apiOld';
import api from './apiNew';

export const login = ({email, password}) => apiOld.post('member/login', {email, password});
export const logout = () => apiOld.get('member/Logout');
export const signup = ({email, termsaccepted, password, lang}) => {
  return api.post(`account`, {email, termsaccepted, password, lang});
};
export const regCheck = (confirmationCode) => api.put(`member/RegCheck/${confirmationCode}`);
export const regFinish = ({confirmationCode, password}) => api.post(`member/RegFinish/${confirmationCode}`, {password});
export const requestPasswordRestore = (email) => apiOld.post('Member/RequestPasswordRestore', {email});
export const restoreCheck = (confirmationCode) => apiOld.post(`member/PasswordRestoreCheck/${confirmationCode}`);
