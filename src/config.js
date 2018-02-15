export const baseURL = 'http://apiv2.atlant.io/';
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
export const serverCodes = {
  '-1': {
    name: 'Undefined',
    type: 'error',
  },
  '0': {
    name: 'Success',
    type: 'info',
  },
  '1': {
    name: 'Invalid Email',
    type: 'error',
  },
  '2': {
    name: 'Email Already Registered',
    type: 'error',
  },
  '3': {
    name: 'TooMany Confirmations Sent',
    type: 'error',
  },
  '4': {
    name: 'User Create Failed',
    type: 'error',
  },
  '5': {
    name: 'User Update Failed',
    type: 'error',
  },
  '6': {
    name: 'Invalid Confirmation Code',
    type: 'error',
  },
  '7': {
    name: 'Rules Not Accepted',
    type: 'error',
  },
  '8': {
    name: 'InvalidPassword',
    type: 'error',
  },
  '9': {
    name: 'Confirm Password Does Not Match',
    type: 'error',
  },
  '10': {
    name: 'EmailNotConfirmed',
    type: 'error',
  },
  '11': {
    name: 'Login Failed',
    type: 'error',
  },
  '12': {
    name: 'Invalid Phone Format',
    type: 'error',
  },
  '13': {
    name: 'Bad 2Fa Code',
    type: 'error',
  },
  '14': {
    name: 'Too Fast 2fa Code Request',
    type: 'error',
  },
  '15': {
    name: 'Two Factor Auth Code Sent',
    type: 'info',
  },
  '16': {
    name: 'Bad Password',
    type: 'error',
  },
  '17': {
    name: 'User Not Found',
    type: 'error',
  },
  '18': {
    name: 'File Upload Failed',
    type: 'error',
  },
  '19': {
    name: 'Invalid Input Data',
    type: 'error',
  },
  '20': {
    name: 'Document Not Found',
    type: 'error',
  },
  '21': {
    name: 'Invalid Address',
    type: 'error',
  },
  '22': {
    name: 'Invalid Address',
    type: 'error',
  },
  '23': {
    name: 'Invalid Amount',
    type: 'error',
  },
  '24': {
    name: 'Insufficient Funds',
    type: 'error',
  },
  '25': {
    name: 'Funds Withdraw Failure',
    type: 'error',
  },
  '26': {
    name: 'Internal Server Error',
    type: 'error',
  },
  '27': {
    name: 'Unused Last Address',
    type: 'error',
  },
  '28': {
    name: 'Email Required',
    type: 'error',
  },
  '29': {
    name: 'Password Required',
    type: 'error',
  },
  '30': {
    name: 'Body Data Missing',
    type: 'error',
  },
  '31': {
    name: 'Phone Number Not Confirmed',
    type: 'error',
  },
  '32': {
    name: 'Not Logged In',
    type: 'error',
  },
  '33': {
    name: 'Has No Access',
    type: 'error',
  },
  '34': {
    name: 'Sms Sending Failed',
    type: 'error',
  },
  '35': {
    name: 'Invalid Parameter',
    type: 'error',
  },
  '36': {
    name: 'Entry Not Found',
    type: 'error',
  },
  '36': {
    name: 'Entry Not Found',
    type: 'error',
  },
  '37': {
    name: 'Codes Sent Limit Exceed',
    type: 'error',
  },
  '38': {
    name: 'Account Suspended',
    type: 'error',
  },
  '39': {
    name: 'Borrowed Funds Use',
    type: 'error',
  },
  '40': {
    name: 'Insufficient Market Volume',
    type: 'error',
  },
  '41': {
    name: 'Stop Loss Unavailable',
    type: 'error',
  },
  '42': {
    name: 'Take Profit Unavailable',
    type: 'error',
  },
  '43': {
    name: 'Trailing Stop Unavailable',
    type: 'error',
  },
  '44': {
    name: 'Stop Loss Incorrect',
    type: 'error',
  },
  '45': {
    name: 'Take Profit Incorrect',
    type: 'error',
  },
  '46': {
    name: 'Trailing Stop Incorrect',
    type: 'error',
  },
  '50': {
    name: 'Api Keys Limit Reached',
    type: 'error',
  },
  '51': {
    name: 'Api Key Not Found',
    type: 'error',
  },
  '55': {
    name: 'Api Key Incorrect',
    type: 'error',
  },
  '56': {
    name: 'Api Key Privileges Incorrect',
    type: 'error',
  },
  '57': {
    name: 'Transaction Not Foundt',
    type: 'error',
  },
  '58': {
    name: 'Fiat Method Not Found',
    type: 'error',
  },
  '59': {
    name: 'Referal System Disabled',
    type: 'error',
  },
  '60': {
    name: 'Not Cancellable Transaction',
    type: 'error',
  },
  '61': {
    name: 'Invalid 2Fa Method',
    type: 'error',
  },
  '62': {
    name: 'Incorrect Order Type',
    type: 'error',
  },
  '63': {
    name: 'Incorrect Order Status',
    type: 'error',
  },
  '64': {
    name: 'Fix Api Login Not Found',
    type: 'error',
  },
  '65': {
    name: 'Fix Api Login Taken',
    type: 'error',
  },
  '66': {
    name: 'Core Suspended',
    type: 'error',
  },
  '67': {
    name: 'Market Closed',
    type: 'error',
  },
  '68': {
    name: 'Book Market Closed',
    type: 'error',
  },
  '69': {
    name: 'Insufficient Credit Limit',
    type: 'error',
  },
  '70': {
    name: 'Low Verification Level',
    type: 'error',
  },
  '71': {
    name: 'Order Qty Too Small',
    type: 'error',
  },
  '72': {
    name: 'Order Qty Too Large',
    type: 'error',
  },
  '73': {
    name: 'Open Orders Limit Reached',
    type: 'error',
  },
  '74': {
    name: 'Resend Unavailable',
    type: 'error',
  },
  '75': {
    name: 'Invalid Withdrawal Details',
    type: 'error',
  },
  '76': {
    name: 'Personal Data Not Accepted',
    type: 'error',
  },
  '77': {
    name: 'Personal Data Not Provided',
    type: 'error',
  },
  '78': {
    name: 'Wrong Account Verification Status',
    type: 'error',
  },
  '79': {
    name: 'Proof Of Identity Not Found',
    type: 'error',
  },
  '80': {
    name: 'Proof Of Residence Not Found',
    type: 'error',
  },
  '81': {
    name: 'Money PoloSP Account Not Found',
    type: 'error',
  },
  '82': {
    name: 'Invalid Card Number',
    type: 'error',
  },
  '83': {
    name: 'Invalid Card Expiration Date',
    type: 'error',
  },
  '84': {
    name: 'Invalid AdvCash WalletId',
    type: 'error',
  },
  '85': {
    name: 'Invalid Currency',
    type: 'error',
  },
  '86': {
    name: 'Negative Or Zero Value',
    type: 'error',
  },
  '87': {
    name: 'Negative Valuee',
    type: 'error',
  },
  '88': {
    name: 'Invalid Proof Document Type',
    type: 'error',
  },
  '89': {
    name: 'Chart Not Found',
    type: 'error',
  },
  '90': {
    name: 'Invalid Date Format',
    type: 'error',
  },
  '91': {
    name: 'Invalid Fix Api Credentials',
    type: 'error',
  },
  '92': {
    name: 'Two Factor Codes Daily Limit Exceeded',
    type: 'error',
  },
  '93': {
    name: 'Registration Unavailable',
    type: 'error',
  },
  '94': {
    name: 'Account Blocked',
    type: 'error',
  },
  '95': {
    name: 'Invalid Btce Code',
    type: 'error',
  },
  '96': {
    name: 'High Transaction Fee',
    type: 'error',
  },
  '97': {
    name: 'Invalid Document Type',
    type: 'error',
  },
  '97': {
    name: 'Invalid Pair',
    type: 'error',
  },
  '100': {
    name: 'Invalid Fiat Payment Code Expiry Period',
    type: 'error',
  },
  '101': {
    name: 'Fiat Payment Code Recipient Not Exists',
    type: 'error',
  },
  '102': {
    name: 'Invalid Fiat PaymentCode',
    type: 'error',
  },
  '103': {
    name: 'Fiat Payment Code Not Found',
    type: 'error',
  },
  '104': {
    name: 'Fiat Payment Code Expired',
    type: 'error',
  },
  '114': {
    name: 'Two Factor Auth Locked',
    type: 'error',
  },
  '115': {
    name: 'Login Locked',
    type: 'error',
  },
  '116': {
    name: 'Fiat Code Activation Locked',
    type: 'error',
  },
  '117': {
    name: 'Fiat Code Activation Locked',
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
