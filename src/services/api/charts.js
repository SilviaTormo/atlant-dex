import api from './api';

export const getCandlesCollection = ({period, pair}) => api.get('/candlescollection?', {params: {period, pair}});
