import serverErrors from './server-errors/en';

export default {
  copied: 'Copied',
  loggedIn: 'Logged in ({0})',
  passwordNotValid: 'At least 8 symbols including 1 number and 1 capital letter.',
  tfaEnabled: '2FA enabled',
  tfaDisabled: '2FA disabled',
  tfaConfirmTextTelegramEnable: 'Confirmation code has been sent via Telegram to enable 2FA',
  tfaConfirmTextTelegramDisable: 'Confirmation code has been sent via Telegram to disable 2FA',
  tfaConfirmTextSMSEnable: 'SMS with confirmation code has been sent to enable 2FA',
  tfaConfirmTextSMSDisable: 'SMS with confirmation code has been sent to disable 2FA',
  tfaConfirmTextGoogleEnable: 'Enter the one-time password from Google Auth to enable 2FA',
  tfaConfirmTextGoogleDisable: 'Enter the one-time password from Google Auth to disable 2FA',
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
  emailSent: 'Emil sent to {0}',
  serverErrors,
};
// Confirmation code has been sent to enable 2FA
// Confirmation code has been sent to disable 2FA
