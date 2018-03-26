import api from './apiNew';

export const tierOneVerify = (data) => api.post('/profile/verification/tier1', data);
export const getLastVerification = () => api.get('/profile/verification/last');

export const moderatorSignin = ({login, password}) => api.post('/moderators/signin', {login, password});
export const approveVerification = (requestId) => api.put(`/verification/approve/${requestId}`);
export const rejectVerification = ({verificationId, reason}) => api.put('/verification/reject', {verificationId, reason});
export const getUserList = ({page, limit}) => api.get('/account', {params: {page, limit}});
export const getUserApplication = (userId) => api.get(`/account/${userId}`);
