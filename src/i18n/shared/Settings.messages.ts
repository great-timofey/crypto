import { defineMessages } from 'react-intl';

const messages = {
  language: {
    id: 'settings.language',
    defaultMessage: 'Language',
  },
  appearance: {
    id: 'settings.appearance',
    defaultMessage: 'Appearance',
  },
  settings: {
    id: 'settings',
    defaultMessage: 'Settings',
  },
  biometryAndPincode: {
    id: 'settings.biometryAndPincode',
    defaultMessage: '{biometry} and PIN',
  },
  biometryLogging: {
    id: 'settings.biometryLogging',
    defaultMessage: 'Login with {biometry}',
  },
  byPincode: {
    id: 'settings.byPincode',
    defaultMessage: 'PIN-code',
  },
  pincodeTurnedOff: {
    id: 'settings.pincodeTurnedOff',
    defaultMessage: 'PIN-code has been turned off successfully',
  },
  byFingerprint: {
    id: 'settings.byFingerprint',
    defaultMessage: 'fingerprint',
  },
  fingerprint: {
    id: 'settings.fingerprint',
    defaultMessage: 'Fingerprint',
  },
  faceIdLogging: {
    id: 'settings.faceIdLogging',
    defaultMessage: 'Log in with Face ID',
  },
  personal: {
    id: 'settings.personal',
    defaultMessage: 'Personal',
  },
  safety: {
    id: 'safety',
    defaultMessage: 'Safety',
  },
  support: {
    id: 'support',
    defaultMessage: 'Support',
  },
  faq: {
    id: 'faq',
    defaultMessage: 'FAQ',
  },
  userAgreement: {
    id: 'userAgreement',
    defaultMessage: 'User Agreement',
  },
  privacyPolicy: {
    id: 'privacyPolicy',
    defaultMessage: 'Privacy Policy',
  },
  contactWithSpecialist: {
    id: 'settings.contactWithSpecialist',
    defaultMessage: 'Contact with a specialist',
  },
  development: {
    id: 'settings.development',
    defaultMessage: 'Development',
  },
  useSystemTheme: {
    id: 'settings.useSystemTheme',
    defaultMessage: 'Use system theme',
  },
  themes: {
    id: 'settings.themes',
    defaultMessage: 'Themes',
  },
  useSystemThemeDescription: {
    id: 'settings.useSystemThemeDescription',
    defaultMessage:
      'The appearance of the application will switch automatically when {system} theme changes',
  },
  createPincode: {
    id: 'settings.createPincode',
    defaultMessage: 'Enter a 6-digit PIN-code for logging in',
  },
  repeatPincode: {
    id: 'settings.repeatPincode',
    defaultMessage: 'Repeat a 6-digit PIN-code for logging in',
  },
  pincodesDontMatch: {
    id: 'settings.pincodesDontMatch',
    defaultMessage: 'PIN-codes do not match, try again',
  },
  pincodeSet: {
    id: 'settings.pincodeSet',
    defaultMessage: 'PIN-code has been set successfully',
  },
  login: {
    id: 'login',
    defaultMessage: 'Login',
  },
  name: {
    id: 'name',
    defaultMessage: 'Name',
  },
  email: {
    id: 'email',
    defaultMessage: 'E-Mail',
  },
  exit: {
    id: 'exit',
    defaultMessage: 'Exit',
  },
  exitConfirm: {
    id: 'settings.exitConfirm',
    defaultMessage: 'Do you really want to logout?',
  },
  fingerprintNotAvailable: {
    id: 'settings.fingerprintNotAvailable',
    defaultMessage: 'Login with fingerpint is not available on this device',
  },
  devModeActivate: {
    id: 'settings.devModeActivate',
    defaultMessage: 'Do you want to activate developer mode?',
  },
  devModeDeactivate: {
    id: 'settings.devModeDectivate',
    defaultMessage: 'Do you want to deactivate developer mode?',
  },
};

export default defineMessages(messages);
