export type AuthState = {
  activeStepIndex: number;
  email: string;
  login: string;
  password: string;
  recaptcha: string;
  accessToken: string | null;
  hash: string;
  firstName: string;
  lastName: string;
  csrfToken: string;
  timer: number;
};

export enum VerifyMobileCodeEnum {
  signUp = 'sign_up',
  resetPassword = 'reset_password',
}

export type AuthChangeableField = keyof Omit<
  AuthState,
  | 'authorized'
  | 'recaptcha'
  | 'accessToken'
  | 'hash'
  | 'needGA'
  | 'gaError'
  | 'timer'
  | 'activeStepIndex'
>;
