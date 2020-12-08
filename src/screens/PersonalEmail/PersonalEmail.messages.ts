import { defineMessages } from 'react-intl';

const messages = {
  next: {
    id: 'next',
    defaultMessage: 'Next',
  },
  enterNewEmail: {
    id: 'personalLogin.enterNewEmail',
    defaultMessage: 'Enter new E-Mail',
  },
  loginMayConsist: {
    id: 'personalLogin.loginMayConsist',
    defaultMessage: 'It may consist of: {value}',
  },
  enterGACode: {
    id: 'enterGACode',
    defaultMessage: 'Enter the code from Google Authenticator app',
  },
  enterEmailCode: {
    id: 'enterEmailCode',
    defaultMessage: 'Enter the code from E-Mail',
  },
  sending: {
    id: 'sending',
    defaultMessage: 'Sending...',
  },
  loginUpdated: {
    id: 'personalLogin.loginUpdated',
    defaultMessage: 'Login updated',
  },
  change: {
    id: 'change',
    defaultMessage: 'Change',
  },
  updating: {
    id: 'updating',
    defaultMessage: 'Updating...',
  },
  invalidEmail: {
    id: 'personalLogin.invalidEmail',
    defaultMessage: 'E-Mail entered incorrectly',
  },
  resendEmail: {
    id: 'personalLogin.resendEmail',
    defaultMessage: 'Resend E-Mail',
  },
};

export default defineMessages(messages);
