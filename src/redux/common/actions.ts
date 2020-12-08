import { createAction } from '@reduxjs/toolkit';

import { IconName } from '$components/Icon/Icon.interface';
import { NarfexThemeColor } from '$global/theme';

const prefix = 'COMMON';

export type ShowToastAction = {
  text?: string;
  icon?: IconName;
  iconFill?: NarfexThemeColor | null;
};

export const displayToast = createAction<ShowToastAction>(`${prefix}/DISPLAY_TOAST`);
export const displayToastError = createAction<ShowToastAction['text']>(
  `${prefix}/DISPLAY_TOAST_ERROR`,
);
export const displayToastSuccess = createAction<ShowToastAction['text']>(
  `${prefix}/DISPLAY_TOAST_SUCCESS`,
);
export const hideToast = createAction(`${prefix}/HIDE_TOAST`);
export const hideToastUserInitiated = createAction(`${prefix}/HIDE_TOAST_USER_INITIATED`);
export const showToast = createAction<ShowToastAction>(`${prefix}/SHOW_TOAST`);
export const showBlurView = createAction(`${prefix}/SHOW_BLUR_VIEW`);
export const hideBlurView = createAction(`${prefix}/HIDE_BLUR_VIEW`);
export const setNeedGA = createAction<boolean>(`${prefix}/SET_NEED_GA`);
export const setDevMode = createAction<boolean>(`${prefix}/SET_DEV_MODE`);
export const displayGAError = createAction(`${prefix}/DISPLAY_GA_ERROR`);
export const displayEmailError = createAction(`${prefix}/DISPLAY_EMAIL_ERROR`);
export const setGAError = createAction<boolean>(`${prefix}/SET_GA_ERROR`);
export const setFatalError = createAction<string | null>(`${prefix}/SET_FATAL_ERROR`);
export const setEmailError = createAction<boolean>(`${prefix}/SET_EMAIL_ERROR`);
export const setGACode = createAction<string>(`${prefix}/SET_GA_CODE`);
export const setEmailCode = createAction<string>(`${prefix}/SET_EMAIL_CODE`);
export const clearCommonState = createAction(`${prefix}/CLEAR_COMMON_STATE`);
export const loadInitialData = createAction(`${prefix}/LOAD_INITIAL_DATA`);
export const setAppIsReady = createAction<boolean>(`${prefix}/SET_APP_IS_READY`);
export const setFaceIdAvailable = createAction<boolean>(
  `${prefix}/SET_FACE_ID_AVAILABLE`,
);
export const openExternalUrl = createAction<string>(`${prefix}/OPEN_EXTERNAL_URL`);
