// import apiOld from './apiOld';
import api from './apiNew';

export const getProfile = () => api.get('profile/my');
export const requestTFAChange = ({method, contact}) => api.post('profile/requestTfaChanging', {method, contact});
export const finishTFAChange = ({method, contact, code}) => api.put('profile/finishTfaChanging', {method, contact, code});
