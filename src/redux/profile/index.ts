import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BiometricsType, ProfileState } from './interface';

import { ThemesEnum } from '$global/theme';
import { Locale } from '$i18n';

export const profileReducerName = 'profile';

const initialState: ProfileState = {
  user: {
    id: 0,
    login: '',
    email: '',
    firstName: '',
    lastName: '',
  },
  isLoggedIn: false,
  canEditDocumentation: false,
  isWithdrawDisabled: false,
  gaEnabled: true,
  hasDeposits: false,
  hasNotifications: false,
  hasSecretKey: true,
  isExchangeEnabled: true,
  verification: null,
  roles: [],
  locale: 'en',
  themeAuto: true,
  theme: ThemesEnum.light,
  isIdentified: false,
  pincode: null,
  biometrics: null,
  activeStepIndex: 0,
  settings: {
    resendTimeout: 0,
    editLoginStep: 0,
    editEmailStep: 0,
    email: '',
    login: '',
  },
};

export const blacklistedProfileFields = ['settings', 'isIdentified', 'activeStepIndex'];

const profile = createSlice({
  name: profileReducerName,
  initialState,
  reducers: {
    requestSignOut() {},
    signOutSuccess() {},
    clearUser: (state) => ({
      ...state,
      isLoggedIn: initialState.isLoggedIn,
      user: initialState.user,
    }),
    clearProfile: () => initialState,
    setProfile: (state, action: PayloadAction<ProfileState>) => ({
      ...state,
      ...action.payload,
      isLoggedIn: true,
    }),
    changeUserLogin(state, action: PayloadAction<string>) {
      state.user.login = action.payload;
    },
    changeUserEmail(state, action: PayloadAction<string>) {
      state.user.email = action.payload;
    },
    changeLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload;
    },
    changeThemeAuto: (state, action: PayloadAction<boolean>) => {
      state.themeAuto = action.payload;
    },
    changeTheme: (state, action: PayloadAction<ThemesEnum>) => {
      state.theme = action.payload;
    },
    setSettingsLogin: (state, action: PayloadAction<string>) => {
      state.settings.login = action.payload;
    },
    setSettingsEmail: (state, action: PayloadAction<string>) => {
      state.settings.email = action.payload;
    },
    setEditLoginStep(state, action: PayloadAction<number>) {
      state.settings.editLoginStep = action.payload;
    },
    setEditEmailStep(state, action: PayloadAction<number>) {
      state.settings.editEmailStep = action.payload;
    },
    setResendTimeout(state, action: PayloadAction<number>) {
      state.settings.resendTimeout = action.payload;
    },
    requestUpdateLogin() {},
    sendEmailCode() {},
    confirmEmail() {},
    requestFaceIdUsage() {},
    clearSettings(state) {
      state.settings = initialState.settings;
    },
    setIdentified: (state, action: PayloadAction<boolean>) => {
      state.isIdentified = action.payload;
    },
    setPincode: (state, action: PayloadAction<string | null>) => {
      state.pincode = action.payload;
    },
    setBiometrics: (state, action: PayloadAction<BiometricsType>) => {
      state.biometrics = action.payload;
    },
    setActiveStepIndex: (state, action: PayloadAction<number>) => {
      state.activeStepIndex = action.payload;
    },
  },
});

export const profileActions = profile.actions;
export const profileReducer = profile.reducer;
