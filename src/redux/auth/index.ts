import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthChangeableField, AuthState } from './interface';

export const authReducerName = 'auth';
export const blacklistedAuthFields = ['activeStepIndex', 'timer'];

export const initialState: AuthState = {
  activeStepIndex: 0,
  email: '',
  login: '',
  password: '',
  recaptcha: '',
  accessToken: null,
  firstName: '',
  lastName: '',
  hash: '',
  csrfToken: '',
  timer: 0,
};

const auth = createSlice({
  name: authReducerName,
  initialState,
  reducers: {
    signInRequest() {},
    signUpRequest() {},
    signInTwoStepRequest() {},
    sendEmailForResetPasswordRequest() {},
    resetPasswordRequest() {},
    checkLoginRequest() {},
    sendEmailForSignUpRequest() {},
    // @ts-ignore
    checkEmailCodeRequest(state, action: PayloadAction<string>) {},
    setAuthorizationActiveStepIndex: (state, action: PayloadAction<number>) => {
      state.activeStepIndex = action.payload;
    },
    setAuthField: (
      state,
      action: PayloadAction<{ key: AuthChangeableField; value: string }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    clearAuthData: () => initialState,
    resetAuthData: (state) => ({
      ...initialState,
      accessToken: state.accessToken,
    }),
    setRecaptcha: (state, action: PayloadAction<string | undefined>) => {
      state.recaptcha = action.payload ?? '';
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload ?? '';
    },
    setHash: (state, action: PayloadAction<string>) => {
      state.hash = action.payload ?? '';
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },
  },
});

export const authActions = auth.actions;
export const authReducer = auth.reducer;
