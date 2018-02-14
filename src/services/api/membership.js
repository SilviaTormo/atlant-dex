import apiOld from './apiOld';
import api from './apiNew';

export const login = ({email, password}) => apiOld.post('member/login', {email, password});
export const logout = () => apiOld.get('member/Logout');
export const signup = ({email, termsaccepted, password, lang}) => {
  return api.post(`account`, {email, termsaccepted, password, lang});
};
export const regFinish = (сode) => api.put(`account/email/confirmation/${сode}`);
export const requestPasswordRestore = (email) => apiOld.post('Member/RequestPasswordRestore', {email});
export const restoreCheck = (confirmationCode) => apiOld.post(`member/PasswordRestoreCheck/${confirmationCode}`);
