import { defineMessages } from 'react-intl';

const messages = {
  next: {
    id: 'next',
    defaultMessage: 'Next',
  },
  enterNewLogin: {
    id: 'personalLogin.enterNewLogin',
    defaultMessage: 'Enter new login',
  },
  loginMayConsist: {
    id: 'personalLogin.loginMayConsist',
    defaultMessage: 'It may consist of: {value}',
  },
  enterGACode: {
    id: 'enterGACode',
    defaultMessage: 'Enter the code from Google Authenticator app',
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
  invalidLogin: {
    id: 'personalLogin.invalidLogin',
    defaultMessage: 'Login entered incorrectly',
  },
};

export default defineMessages(messages);
