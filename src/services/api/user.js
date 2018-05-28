import api from './api';

export const getProfile = () => api.get('profile/my');

export const requestTFAChange = ({method, contact}) => api.post('profile/requestTfaChanging', {method, contact});
export const finishTFAChange = ({method, contact, code}) => api.put('profile/finishTfaChanging', {method, contact, code});

export const changePhone = ({countryCode, phone}) => api.put(`profile/fields/phone`, {countryCode, phone});
export const changePreferredCurrency = (currencyCode) => api.put(`profile/fields/prefferedCurrency/${currencyCode}`);
export const changeNewsletterSubscription = (isEnable) => api.put(`profile/subscription/${isEnable}`);
export const verifyPhone = (code) => api.put(`/profile/fields/verify/phone/${code}`);
export const changeAdditionalEmail = (email) => api.put(`profile/fields/additionalEmail/${email}`);
export const verifyAdditionalEmail = (confirmationCode) => api.put(`profile/fields/verify/additionalEmail/${confirmationCode}`);

export const getAccountTransactionHistory = ({page, limit, sortBy, ascending}) => api.get('crypto/transactions?', {params: {page, limit, sortBy, ascending}});
export const getNotificationHistory = ({page, limit, sortBy, ascending}) => api.get('/notifications/history', {params: {page, limit, sortBy, ascending}});
export const getSecurityLog = ({page, limit}) => api.get('logs/security', {params: {page, limit}});

export const getBalances = () => api.get('account/balances');
export const getCurrencies = () => api.get('/exchange/currencies');
export const deposit = ({currency, amount}) => api.put('account/deposit', {currency, amount});
export const getDepositAddress = ({currency}) => api.get('crypto/address', {params: {currency}});
export const withdraw = ({currency, amount, address}) => api.post('crypto/withdraw/request', {currency, amount, address});
export const confirmWithdraw = ({currency, code, transactionId}) => api.post('crypto/withdraw/finish', {currency, code, transactionId});
