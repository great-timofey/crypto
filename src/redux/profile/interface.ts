import { BiometryType } from 'react-native-biometrics';

import { ThemesEnum } from '$global/theme';
import { Locale } from '$i18n';

export interface ProfileState {
  user: User;
  isLoggedIn: boolean;
  canEditDocumentation: boolean;
  isWithdrawDisabled: boolean;
  gaEnabled: boolean;
  hasDeposits: boolean;
  hasNotifications: boolean;
  hasSecretKey: boolean;
  isExchangeEnabled: boolean;
  verification: verificationType | null;
  roles: string[];
  locale: Locale;
  themeAuto: boolean;
  theme: ThemesEnum;
  settings: {
    resendTimeout: number;
    editLoginStep: number;
    editEmailStep: number;
    email: string;
    login: string;
  };
  isIdentified: boolean;
  pincode: string | null;
  biometrics: BiometricsType;
  activeStepIndex: number;
}

export type BiometricsType = BiometryType | null;

type verificationType =
  | 'verified'
  | 'not_verified'
  | 'pending'
  | 'rejected'
  | 'temporary_rejected';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  login: string;
}
