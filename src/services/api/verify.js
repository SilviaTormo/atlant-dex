import api from './apiNew';

export const tierOneVerify = (data) => api.post('/profile/verification/tier1', data);
export const getLastVerification = () => api.get('/profile/verification/last');

export const moderatorSignin = ({login, password}) => api.post('/moderator/signin', {login, password});
