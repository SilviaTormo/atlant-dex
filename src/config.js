export const baseURL = 'https://apiex.atlant.io';
export const timeout = 30000;
export const hubURL = `${baseURL}/signalr/hubs`;
export const hubName = 'notificationHub';
export const notificationTimeout = 3000;
export const mobileBreakpoint = 992;
export const googleMapsKey = 'AIzaSyBZrLwDh6l5AW1F5Em3pPlABhQ3fmp__AM';
export const showWelcome = false;
export const periods = {
  '1h': '1m',
  '1d': '5m',
  '1w': '15m',
  '1mn': '1h',
  '1y': '12h',
};
export const defPeriod = Object.keys(periods)[2];
export const defCandleSize = periods[defPeriod];
export const serverCodes = {
  '101': {
    name: 'RequestBodyIsMissing',
    type: 'error',
  },
};
