export const baseURL = 'https://apiex.atlant.io';
export const timeout = 30000;
export const hubURL = `${baseURL}/signalr/hubs`;
export const hubName = 'notificationHub';
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
export const defPeriod = Object.keys(periods)[0];
export const defCandleSize = periods[defPeriod];
export const serverCodes = {
  '101': {
    name: 'RequestBodyIsMissing',
    type: 'error',
  },
};

export const profileSections = [
  {
    name: 'accountInformation',
    label: 'Account information',
    category: 'user info',
  },
  {
    name: 'verification',
    label: 'Verification',
    category: 'user info',
  },
  {
    name: 'generalsettings',
    label: 'General settings',
    category: 'user info',
  },
  {
    name: 'changePassword',
    label: 'Password',
    category: 'security',
  },
  {
    name: 'securitySettings',
    label: 'Security settings',
    category: 'security',
  },
  {
    name: 'securityLog',
    label: 'Security log',
    category: 'security',
  },
  {
    name: 'faq',
    label: 'FAQ',
    category: 'user info',
  },
  {
    name: 'transactionHistory',
    label: 'Transaction history',
  },
  {
    name: 'myOrders',
    label: 'My orders',
  },
];
