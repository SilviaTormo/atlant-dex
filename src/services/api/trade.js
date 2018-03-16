import api from './apiNew';
import apiOld from './apiOld';

export const getChart = ({period, pair}) => apiOld.get('/trade/chart', {params: {period, pair}});
export const getDesktop = ({limit, pair}) => apiOld.get('/trade/getDesktop?', {params: {limit, pair}});
export const getTradeHistory = ({page, limit, pair}) => api.get(`/trades?page=${page}&limit=${limit}&pair=${pair}`);

export const getAccountTradeHistory = ({page, limit, pair}) => api.get(`/trades/my?page=${page}&limit=${limit}&pair=${pair}`);
export const getAccountTransactionHistory = ({limit, offset, status, baseCurrency, currency}) => apiOld.get('/account/transactionList?', {params: {limit, offset, status, baseCurrency, currency}});

export const getTradeInfo = ({pair}) => apiOld.get('/trade/getTraderInfo?', {params: {pair}});
export const getTraderWallet = () => apiOld.get('/trade/traderWallets');

export const getPlaceMarket = (pair, {amount, base_cur_amount, side}) => apiOld.post(`/trade/${pair}/placeMarket`, {amount, base_cur_amount, side});
export const getPlaceLimit = (pair, {amount, price, side}) => apiOld.post(`/trade/${pair}/placeLimit`, {amount, price, side});

export const getCancelOrder = (pair, id) => apiOld.put(`/trade/${pair}/cancelOrder/` + id);
