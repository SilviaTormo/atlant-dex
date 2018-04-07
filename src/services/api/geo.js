import api from './apiNew';

export const getCountries = () => api.get('geo/countries');
export const getCities = ({country}) => api.get(`geo/cities/${country}`);
