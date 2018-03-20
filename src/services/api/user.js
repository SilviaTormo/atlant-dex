// import apiOld from './apiOld';
import api from './apiNew';

export const getProfile = () => api.get('profile/my');

export const requestTFAChange = ({method, contact}) => api.post('profile/requestTfaChanging', {method, contact});
export const finishTFAChange = ({method, contact, code}) => api.put('profile/finishTfaChanging', {method, contact, code});

export const changeName = (fullName) => api.put(`profile/fields/fullname/${fullName}`);
export const changePhone = ({countryCode, phone}) => api.put(`profile/fields/phone`, {countryCode, phone});
export const verifyPhone = (code) => api.put(`/profile/fields/verify/phone/${code}`);
export const changeAdditionalEmail = (email) => api.put(`profile/fields/additionalEmail/${email}`);
export const verifyAdditionalEmail = (confirmationCode) => api.put(`profile/fields/verify/additionalEmail/${confirmationCode}`);

export const getSecurityLog = ({page, limit}) => api.get('logs/security', {params: {page, limit}});

export const deposit = ({currency, amount}) => api.put('account/deposit', {currency, amount});
