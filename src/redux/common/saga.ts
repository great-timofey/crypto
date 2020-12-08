import AsyncStorage from '@react-native-community/async-storage';
import { Linking } from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { REHYDRATE } from 'redux-persist';
import { all, call, delay, put, race, select, take, takeEvery } from 'redux-saga/effects';

import {
  clearCommonState,
  displayEmailError,
  displayGAError,
  displayToast,
  displayToastError,
  displayToastSuccess,
  hideToast,
  hideToastUserInitiated,
  loadInitialData,
  openExternalUrl,
  setAppIsReady,
  setDevMode,
  setEmailError,
  setFaceIdAvailable,
  setFatalError,
  setGAError,
  showToast,
} from './actions';

import { AsyncStorageKeysEnum } from '$global/asyncStorageKeys';
import { CODE_INPUT_ERROR_DURATION, DEFAULT_TOAST_DURATION } from '$global/constants';
import { DEVICE_LOCALE } from '$global/device';
import { profileActions } from '$redux/profile';
import { commonSelector, profileSelector } from '$redux/selectors';
import { loadCurrenciesWorker, loadWalletsWorker } from '$redux/wallets/saga';
import { requestChangeApiDevMode } from '$services/api';
import { loadProfileWorker } from '$redux/profile/saga';

export function* displayGAErrorWorker() {
  yield put(setGAError(true));
  yield delay(CODE_INPUT_ERROR_DURATION);
  yield put(setGAError(false));
}

export function* displayEmailErrorWorker() {
  yield put(setEmailError(true));
  yield delay(CODE_INPUT_ERROR_DURATION);
  yield put(setEmailError(false));
}

export function* toastWorker(action: ReturnType<typeof displayToast>) {
  yield put(
    showToast({
      text: action.payload.text,
      icon: action.payload.icon,
      iconFill: action.payload.iconFill || null,
    }),
  );

  yield race({
    task: delay(DEFAULT_TOAST_DURATION),
    cancel: take(hideToastUserInitiated),
  });

  yield put(hideToast());
}

export function* toastWorkerError(action: ReturnType<typeof displayToastError>) {
  yield put(
    displayToast({
      text: action.payload,
      icon: 'attention',
      iconFill: 'error',
    }),
  );
}

export function* toastWorkerSuccess(action: ReturnType<typeof displayToastSuccess>) {
  yield put(
    displayToast({
      text: action.payload,
      icon: 'check',
      iconFill: 'success',
    }),
  );
}

function* loadInitialDataWorker() {
  yield put(setFatalError(null));
  const { isLoggedIn } = yield select(profileSelector);

  try {
    if (isLoggedIn) {
      yield all([loadCurrenciesWorker(), loadWalletsWorker(), loadProfileWorker()]);
    } else {
      yield all([loadCurrenciesWorker()]);
    }

    yield put(setAppIsReady(true));
  } catch (e) {
    yield put(setFatalError(e.message));
  }
}

function* initialLocaleSetupWorker() {
  const appHasLaunched = yield AsyncStorage.getItem(AsyncStorageKeysEnum.appHasLaunched);

  if (!appHasLaunched) {
    const deviceLang = DEVICE_LOCALE.slice(0, 2).toLowerCase();
    yield put(profileActions.changeLocale(deviceLang === 'ru' ? 'ru' : 'en'));
    yield AsyncStorage.setItem(AsyncStorageKeysEnum.appHasLaunched, '1');
  }
}

function* faceIdAvailabilityWorker(action: any) {
  const rehydratedFaceId = action.payload?.faceIdAvailable;
  if (rehydratedFaceId === undefined) return;

  const { faceIdAvailable } = yield select(commonSelector);

  if (faceIdAvailable === null) {
    const faceIDPermission = PERMISSIONS.IOS.FACE_ID;
    const faceIdCheckResult = yield check(faceIDPermission);

    if (faceIdCheckResult === RESULTS.UNAVAILABLE) {
      yield put(setFaceIdAvailable(false));
    } else {
      yield put(setFaceIdAvailable(true));
    }
  }
}

function* openExternalUrlWorker(action: ReturnType<typeof openExternalUrl>) {
  const { payload: resource } = action;

  try {
    const approved = yield Linking.canOpenURL(resource);
    if (approved) {
      yield Linking.openURL(resource);
    } else {
      yield put(displayToastError('Error'));
    }
  } catch (err) {
    console.log(err);
  }
}

function* setDevModeWorker(action: ReturnType<typeof setDevMode>) {
  const { payload: devMode } = action;

  try {
    yield call(requestChangeApiDevMode, devMode);
  } catch (err) {
    console.log(err);
  }
}

function* refreshDevModeWorker(action: any) {
  const rehydratedDevMode = action.payload?.devMode;
  if (rehydratedDevMode === undefined) return;

  const { devMode }: ReturnType<typeof commonSelector> = yield select(commonSelector);

  try {
    yield call(requestChangeApiDevMode, devMode);
  } catch (err) {
    console.log(err);
  }
}

function* resetStateWorker() {
  yield put(clearCommonState());
}

export function* rootCommonSaga() {
  yield takeEvery(displayToast, toastWorker);
  yield takeEvery(displayToastError, toastWorkerError);
  yield takeEvery(displayToastSuccess, toastWorkerSuccess);
  yield takeEvery(displayGAError, displayGAErrorWorker);
  yield takeEvery(displayEmailError, displayEmailErrorWorker);
  yield takeEvery(loadInitialData, loadInitialDataWorker);
  yield takeEvery(profileActions.signOutSuccess, resetStateWorker);
  yield takeEvery(REHYDRATE, initialLocaleSetupWorker);
  yield takeEvery(REHYDRATE, faceIdAvailabilityWorker);
  yield takeEvery(REHYDRATE, refreshDevModeWorker);
  yield takeEvery(setDevMode, setDevModeWorker);
  yield takeEvery(openExternalUrl, openExternalUrlWorker);
}
