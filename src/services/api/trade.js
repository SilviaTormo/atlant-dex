import api from './apiNew';
import apiOld from './apiOld';

export const getChart = ({period, pair}) => apiOld.get('/trade/chart', {params: {period, pair}});
// export const getTradeHistory = ({page, limit, pair}) => api.get(`/trades?page=${page}&limit=${limit}&pair=${pair}`);

// export const getAccountTradeHistory = ({page, limit, pair}) => api.get(`/trades/my?page=${page}&limit=${limit}&pair=${pair}`);
// export const getAccountTransactionHistory = ({limit, offset, status, baseCurrency, currency}) => apiOld.get('/account/transactionList?', {params: {limit, offset, status, baseCurrency, currency}});

// export const getTradeInfo = ({pair}) => apiOld.get('/trade/getTraderInfo?', {params: {pair}});
// export const getTraderWallet = () => apiOld.get('/trade/traderWallets');

// NEW API
export const exchangePairs = () => api.get('/Exchange/pairs');
export const exchangePairInfo = ({baseCurrency, quoteCurrency}) => api.get(`/Exchange/pair/${baseCurrency}/${quoteCurrency}`);

export const placeOrder = ({isMarketOrder, isSellOrder, baseCurrency, quoteCurrency, price, quantity, isQuantityInBaseCurrency}) => api.post(`/orders`, {isMarketOrder, isSellOrder, baseCurrency, quoteCurrency, price, quantity});
export const cancelOrder = ({orderId, priority}) => api.put('/orders/cancel', {orderId, priority});

export const getOrders = (param) => api.get('/orders/my', {params: param});
export const getTradesForOrder = (orderId) => api.get(`/trades/order/${orderId}`);
export const getOrderBook = ({baseCurrency, quoteCurrency, limit}) => api.get('/orders/orderBook', {params: {baseCurrency, quoteCurrency, limit}});
