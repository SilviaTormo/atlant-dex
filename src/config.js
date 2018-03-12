export const baseURL = 'https://apiv2.atlant.io/';
export const baseURLOld = 'https://apiex.atlant.io';
export const timeout = 30000;
export const hubURL = `${baseURLOld}/signalr/hubs`;
export const hubName = 'notificationHub';
export const mobileBreakpoint = 992;
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

export const operatingSystems = [
  {
    id: 'android',
    name: 'Android',
  },
  {
    id: 'ios',
    name: 'iOS',
  },
  {
    id: 'windows',
    name: 'Windows phone',
  },
];

export const tfaMethods = [
  {
    id: 3,
    name: 'Telegram',
  },
  {
    id: 1,
    name: 'SMS',
  },
  {
    id: 2,
    name: 'Google Auth',
  },
];
