import api from './api';

export const getCountries = () => api.get('geo/countries');
export const getCities = ({country}) => api.get(`geo/cities/${country}`);
