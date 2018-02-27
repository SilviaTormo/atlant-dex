// import apiOld from './apiOld';
import api from './apiNew';

export const getProfile = () => api.get('profile/my');
