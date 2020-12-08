import { defineMessages } from 'react-intl';

const messages = {
  confirmFingerprint: {
    id: 'security.confirmFingerprint',
    defaultMessage: 'Confirm fingerprint',
  },
  enterPincode: {
    id: 'security.enterPincode',
    defaultMessage: 'Enter PIN-code',
  },
  enterPincodeDisableValidation: {
    id: 'security.enterPincodeDisableValidation',
    defaultMessage: 'Enter PIN-code to turn off validation',
  },
  cannotLogin: {
    id: 'security.cannotLogin',
    defaultMessage: 'Cannot login?',
  },
  scanFingerprint: {
    id: 'security.scanFingerprint',
    defaultMessage: 'Press to scan fingerpint',
  },
  runIosBiometry: {
    id: 'security.runIosBiometry',
    defaultMessage: 'Press to run {iosBiometryType}',
  },
  faceIdPermissionTitle: {
    id: 'security.faceIdPermissionTitle',
    defaultMessage: 'Do you want to allow app to use Face ID?',
  },
  faceIdPermissionBody: {
    id: 'security.faceIdPermissionBody',
    defaultMessage: 'Enabling Face ID allows you quick and secure access to your account',
  },
  dontAllow: {
    id: 'security.dontAllow',
    defaultMessage: `Don't allow`,
  },
  faceIdOff: {
    id: 'security.faceIdOff',
    defaultMessage: 'Face ID is Off',
  },
  turnOnFaceIdInSettings: {
    id: 'security.turnOnFaceIdInSettings',
    defaultMessage: 'Turn on Face ID in Settings > Narfex to allow app to use Face ID',
  },
  settings: {
    id: 'security.settings',
    defaultMessage: 'Settings',
  },
};

export default defineMessages(messages);
