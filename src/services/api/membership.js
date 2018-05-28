import api from './api';

export const login = ({email, password}) => api.post('auth/signin', {email, password});
export const refreshToken = ({grantType, email, refreshToken}) => api.post('auth/signin', {grantType, email, refreshToken});
export const logout = (refreshToken) => api.post(`auth/signout/${refreshToken}`);
export const signup = ({email, termsaccepted, password, lang}) => {
  return api.post(`account`, {email, termsaccepted, password, lang});
};
export const regFinish = (сode) => api.put(`account/email/confirmation/${сode}`);

export const requestPasswordRestore = (email) => api.put(`account/resetPassword/${email}`);
export const validatePasswordRestore = ({code, email}) => api.put('account/validatePasswordReset', {code, email});
export const confirmPasswordRestore = (code) => api.post(`account/confirmPasswordReset/${code}`);
export const finishPasswordRestore = ({newpassword, confirmedpassword, code}) => api.post(`account/finishPasswordReset`, {newpassword, confirmedpassword, code});

export const requestPasswordChange = ({oldpassword, newpassword}) => api.put('account/changePassword', {oldpassword, newpassword});
export const confirmPasswordChange = ({code, oldpassword, newpassword}) => api.put('account/finishPasswordChanging', {code, oldpassword, newpassword});
