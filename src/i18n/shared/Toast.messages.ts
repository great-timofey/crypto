import { defineMessages } from 'react-intl';

const messages = {
  checking: {
    id: 'toast.checking',
    defaultMessage: 'Checking',
  },
  registration: {
    id: 'toast.registration',
    defaultMessage: 'Registration',
  },
  authorizationLoginIncorrect: {
    id: 'toast.error.auth.login',
    defaultMessage: 'Please recheck length of login and set of used characters',
  },
  authorizationNameIncorrect: {
    id: 'toast.error.auth.name',
    defaultMessage:
      'First and last names may contain Latin letters only and be at should be at least 2 symbols length',
  },
  signInUnknownError: {
    id: 'toast.error.signin.unknownError',
    defaultMessage: 'Sign in error. Please try again',
  },
  signInLoginNeed: {
    id: 'toast.error.signin.login',
    defaultMessage: 'Please fill login',
  },
  signInPasswordNeed: {
    id: 'toast.error.signin.password',
    defaultMessage: 'Please fill password',
  },
  signInRecaptchaNeed: {
    id: 'toast.error.recaptcha',
    defaultMessage: 'Need Recaptcha to proceed sign in',
  },
  signInIncorrectCredentials: {
    id: 'toast.error.signin.incorrectCredentials',
    defaultMessage: 'Incorrect login or password',
  },
  failedLoadBalances: {
    id: 'toast.error.main.failedLoadBalances',
    defaultMessage: 'Failed to load balances',
  },
  sendCoinsNeedAmount: {
    id: 'toast.error.wallet.send.amount',
    defaultMessage: 'Please fill amount to send',
  },
  sendCoinsNeedLogin: {
    id: 'toast.error.wallet.send.login',
    defaultMessage: 'Please fill login',
  },
  sendCoinsNeedAddress: {
    id: 'toast.error.wallet.send.address',
    defaultMessage: 'Please fill address',
  },
  sendCoinsUserNotExist: {
    id: 'toast.error.wallet.send.userNotExist',
    defaultMessage: 'User with login {login} does not exist',
  },
  sending: {
    id: 'toast.pending.sending',
    defaultMessage: 'Sending',
  },
  swapping: {
    id: 'toast.pending.swapping',
    defaultMessage: 'Swapping...',
  },
  loginNotFound: {
    id: 'toast.error.loginNotFound',
    defaultMessage: 'Login not found',
  },
  textCopiedToClipboard: {
    id: 'textCopiedToClipboard',
    defaultMessage: 'Text copied to clipboard',
  },
  loginAlreadyExists: {
    id: 'loginAlreadyExists',
    defaultMessage: 'This login is already taken',
  },
  passwordResetSuccessfully: {
    id: 'toast.success.passwordReset',
    defaultMessage: 'Password has been reset successfully',
  },
  sendAmountTooLow: {
    id: 'toast.error.wallet.send.tooLow',
    defaultMessage: 'Minimum sum to send is {minimum} {currency}',
  },
  sendAmountTooHigh: {
    id: 'toast.error.wallet.send.tooHigh',
    defaultMessage: 'Maximum sum to send is {maximum} {currency}',
  },
};

export default defineMessages(messages);
