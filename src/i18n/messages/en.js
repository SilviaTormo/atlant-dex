import serverErrors from './server-errors/en';

export default {
  copied: 'Copied',
  passwordNotValid: 'At least 8 symbols including 1 number and 1 capital letter.',
  passwordValidation: {
    tooShort: 'Password must have at least {minLength} letters',
    notMatch: 'Passwords must be identical',
  },
  sent2FA: [
    'You were sent an email to confirm',
    'You were sent text message to confirm',
    'Please enter Google Auth code to confirm',
    'You were sent Telegram message to confirm',
  ],
  tfaSecureWarning: {
    text: 'Please, enable 2 factor authorization to protect your account',
    title: 'Your account is not secure',
    yesButton: 'OK, enable 2FA',
    noButton: 'No, thanks',
  },
  notifications: {
    loggedIn: 'Your login with IP ({0})',
    tfaEnabled: 'Two factor authorization on',
    tfaDisabled: 'Two factor authorization off',
    upgradeTier: 'You avalible balance is {0}. Please upgrade to the next verification tier',
    orderPlaced: 'New order #{0} placed',
    orderPartiallyFilledSell: 'Order #{0} partially filled: Sell {1} {2}',
    orderFilledSell: 'Order #{0} filled: Sell {1} {2}',
    orderPartiallyFilledBuy: 'Order #{0} partially filled: Buy {1} {2}',
    orderFilledBuy: 'Order #{0} filled: Buy {1} {2}',
  },
  emailSent: 'Email sent to {0}',
  serverErrors,
};
// Confirmation code has been sent to enable 2FA
// Confirmation code has been sent to disable 2FA
