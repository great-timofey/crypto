import { defineMessages } from 'react-intl';

const messages = {
  enterYourLoginOrEmail: {
    id: 'enterYourLoginOrEmail',
    defaultMessage: 'Enter you login or email',
  },
  enterYourEmail: {
    id: 'enterYourEmail',
    defaultMessage: 'Enter you email',
  },
  enterYourEmailToRestorePassword: {
    id: 'enterYourEmailToRestorePassword',
    defaultMessage: 'Enter you email to restore your password',
  },
  sendEmail: {
    id: 'sendEmail',
    defaultMessage: 'Send an email {timeLeft}',
  },
  cannotSignIn: {
    id: 'cannotSignIn',
    defaultMessage: 'Cannot sign in?',
  },
  next: {
    id: 'next',
    defaultMessage: 'Next',
  },
  enterYourPassword: {
    id: 'enterYourPassword',
    defaultMessage: 'Enter you password',
  },
  createPassword: {
    id: 'createPassword',
    defaultMessage: 'Enter you password',
  },
  enterGACode: {
    id: 'enterGACode',
    defaultMessage: 'Enter the code from Google Authenticator app',
  },
  enterMailCode: {
    id: 'enterMailCode',
    defaultMessage: 'Enter the code from an email we have send to you',
  },
  sendAgain: {
    id: 'sendAgain',
    defaultMessage: 'Send an email again {timeLeft}',
  },
  enterUsername: {
    id: 'enterUsername',
    defaultMessage: 'Enter your username',
  },
  enterFirstName: {
    id: 'enterFirstName',
    defaultMessage: 'Enter your first name',
  },
  enterLastName: {
    id: 'enterLastName',
    defaultMessage: 'Enter your last name',
  },
  enterPassword: {
    id: 'enterPassword',
    defaultMessage: 'Enter your password',
  },
  usernameMayContain: {
    id: 'usernameMayContain',
    defaultMessage:
      'It should be at least 4 symbols length and may contain: A-z, 0-9, -, _',
  },
  lowercaseLetters: {
    id: 'lowercaseLetters',
    defaultMessage: 'Lowercase letters',
  },
  uppercaseLetters: {
    id: 'uppercaseLetters',
    defaultMessage: 'Uppercase letters',
  },
  digits: {
    id: 'digits',
    defaultMessage: 'Digits',
  },
  atLess8Symbols: {
    id: 'atLess8Symbols',
    defaultMessage: 'At less 8 symbols',
  },
  repeatPassword: {
    id: 'repeatPassword',
    defaultMessage: 'Repeat your password',
  },
  passwordsDontMatch: {
    id: 'passwordsDontMatch',
    defaultMessage: 'Passwords do not match',
  },
  logout: {
    id: 'profile.logout',
    defaultMessage: 'Logout...',
  },
};

export default defineMessages(messages);
