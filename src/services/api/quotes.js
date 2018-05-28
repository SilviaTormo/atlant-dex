import api from './api';

export const coinsInfo = ({period, currencies}) => api.get(`/exchange/coinsInfo?period=${period}${currencies}`);
