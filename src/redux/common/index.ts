import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
  setGAError,
  setNeedGA,
  showBlurView,
  hideBlurView,
  hideToast,
  showToast,
  setGACode,
  clearCommonState,
  setAppIsReady,
  setEmailError,
  setEmailCode,
  setFaceIdAvailable,
  hideToastUserInitiated,
  setFatalError,
  setDevMode,
} from './actions';

import { IconName } from '$components/Icon/Icon.interface';
import { NarfexThemeColor } from '$global/theme';

export const commonReducerName = 'common';

interface CommonState {
  appIsReady: boolean;
  devMode: boolean;
  fatalError: string | null;
  toastShown: boolean;
  toastIcon: IconName | null;
  toastIconFill: NarfexThemeColor | null;
  toastText: string | null;
  blurViewShown: boolean;
  needGA: boolean;
  gaError: boolean;
  emailError: boolean;
  gaCode: string;
  emailCode: string;
  faceIdAvailable: boolean | null;
}

const commonReducerInitialState: CommonState = {
  faceIdAvailable: null,
  devMode: __DEV__,
  appIsReady: false,
  fatalError: null,
  toastShown: false,
  toastIcon: null,
  toastText: null,
  toastIconFill: null,
  blurViewShown: false,
  //  need only if server returned response { need_ga: true } on sign_in request
  needGA: false,
  gaError: false,
  emailError: false,
  gaCode: '',
  emailCode: '',
};

export const blacklistedCommonFields = Object.keys(commonReducerInitialState).slice(2);

export const commonReducer = createReducer(commonReducerInitialState, (builder) => {
  builder.addCase(setAppIsReady, (state, action: PayloadAction<boolean>) => {
    state.appIsReady = action.payload;
  });
  builder.addCase(showBlurView, (state) => {
    state.blurViewShown = true;
  });
  builder.addCase(hideBlurView, (state) => {
    state.blurViewShown = false;
  });
  builder.addCase(hideToast, (state) => {
    state.toastShown = false;
    state.toastIcon = null;
    state.toastText = null;
  });
  builder.addCase(setDevMode, (state, action) => {
    state.devMode = action.payload;
  });
  builder.addCase(hideToastUserInitiated, (state) => state);
  builder.addCase(showToast, (state, action) => {
    state.toastShown = true;
    state.toastIcon = action.payload.icon ?? null;
    state.toastIconFill = action.payload.iconFill ?? null;
    state.toastText = action.payload.text ?? null;
  });
  builder.addCase(setNeedGA, (state, action) => {
    state.needGA = action.payload;
  });
  builder.addCase(setGAError, (state, action) => {
    state.gaError = action.payload;
  });
  builder.addCase(setEmailError, (state, action) => {
    state.emailError = action.payload;
  });
  builder.addCase(setFatalError, (state, action) => {
    state.fatalError = action.payload;
  });
  builder.addCase(setGACode, (state, action) => {
    state.gaCode = action.payload;
  });
  builder.addCase(setEmailCode, (state, action) => {
    state.emailCode = action.payload;
  });
  builder.addCase(clearCommonState, () => {
    return commonReducerInitialState;
  });
  builder.addCase(setFaceIdAvailable, (state, action) => {
    state.faceIdAvailable = action.payload;
  });
});
