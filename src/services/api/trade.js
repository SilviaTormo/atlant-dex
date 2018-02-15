import api from './apiOld';

export const getChart = ({period, pair}) => api.get('/trade/chart', {params: {period, pair}});
export const getDesktop = ({limit, pair}) => api.get('/trade/getDesktop?', {params: {limit, pair}});
export const getTradeHistory = ({limit, offset, currency, baseCurrency}) => api.get('/trade/tradeHistory?', {params: {limit, offset, currency, baseCurrency}});

export const getAccountTradeHistory = ({limit, offset, currency, baseCurrency}) => api.get('/account/tradeHistory?', {params: {limit, offset, currency, baseCurrency}});
export const getAccountTransactions = ({limit, offset}) => api.get('/account/transactions');

export const getTradeInfo = ({pair}) => api.get('/trade/getTraderInfo?', {params: {pair}});
export const getTraderWallet = () => api.get('/trade/traderWallets');

export const getPlaceMarket = (pair, {amount, base_cur_amount, side}) => api.post(`/trade/${pair}/placeMarket`, {amount, base_cur_amount, side});
export const getPlaceLimit = (pair, {amount, price, side}) => api.post(`/trade/${pair}/placeLimit`, {amount, price, side});

export const getCancelOrder = (pair, id) => api.put(`/trade/${pair}/cancelOrder/` + id);
