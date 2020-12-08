import { Alert } from 'react-native';
import { put, call, takeLatest, select, delay, fork } from 'redux-saga/effects';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import { authActions } from '../auth';
import {
  displayEmailError,
  displayGAError,
  displayToastError,
  displayToastSuccess,
  hideToast,
  setEmailCode,
  setGACode,
  showToast,
} from '../common/actions';

import { profileActions, profileActions as action } from './index';

import { commonSelector } from '$redux/selectors';
import securityMessages from '$i18n/shared/security.messages';
import { BiometryEnum } from '$global/security';
import personalEmailMessages from '$screens/PersonalEmail/PersonalEmail.messages';
import personalLoginMessages from '$screens/PersonalLogin/PersonalLogin.messages';
import { getGlobalIntl } from '$i18n/globalIntl';
import authMessages from '$i18n/shared/Auth.messages';
import { api } from '$services/api';
import SCHEME from '$services/schema';
import { AppState } from '$redux/store';
import { appNavigate } from '$navigation/utils';
import { MainScreensNames } from '$navigation/names';

export function* loadProfileWorker() {
  const profile = yield call(api, SCHEME.Profile.DefaultGet);
  yield put(action.setProfile(profile));
  yield put(authActions.resetAuthData());
}

function* signOutWorker() {
  try {
    yield put(showToast({ text: getGlobalIntl()?.formatMessage(authMessages.logout) }));
    yield call(api, SCHEME.Profile.LogoutPost);
    yield put(hideToast());
    yield put(action.signOutSuccess());
    yield put(setGACode(''));
  } catch (err) {
    yield put(displayToastError(err.message));
  }
}

function* updateLoginWorker() {
  const {
    profile: {
      settings: { login },
    },
    common: { gaCode },
  }: AppState = yield select();

  yield put(
    showToast({ text: getGlobalIntl()?.formatMessage(personalLoginMessages.updating) }),
  );

  try {
    yield call(api, SCHEME.Profile.ChangeLoginPut, {
      login,
      gaCode,
    });
    yield put(action.changeUserLogin(login));
    yield put(
      displayToastSuccess(
        getGlobalIntl()?.formatMessage(personalLoginMessages.loginUpdated),
      ),
    );
    yield put(hideToast());
    yield call(appNavigate, MainScreensNames.Personal);
    yield put(action.setEditLoginStep(0));
    yield put(action.setSettingsLogin(''));
    yield put(setGACode(''));
  } catch (e) {
    if (e.code === 'ga_auth_code_incorrect') {
      yield put(hideToast());
      yield put(displayGAError());
      yield put(setGACode(''));
    } else {
      yield put(displayToastError(e.message));
    }
  }
}

function* sendEmailCodeWorker() {
  const {
    profile: {
      gaEnabled,
      settings: { email },
    },
    common: { gaCode },
  }: AppState = yield select();

  yield put(
    showToast({ text: getGlobalIntl()?.formatMessage(personalEmailMessages.sending) }),
  );

  try {
    const { resendTimeout } = yield call(api, SCHEME.Profile.ChangeEmailPost, {
      email,
      gaCode,
    });
    yield put(action.setResendTimeout(resendTimeout));
    yield fork(timer, resendTimeout);
    yield put(action.setEditEmailStep(gaEnabled ? 2 : 1));
    yield put(hideToast());
  } catch (e) {
    if (e.code === 'ga_auth_code_incorrect') {
      yield put(hideToast());
      yield put(displayGAError());
    } else if (e.code === 'email_incorrect') {
      yield put(action.setEditEmailStep(0));
      yield put(displayToastError(e.message));
    } else {
      yield put(hideToast());
    }
  } finally {
    yield put(setGACode(''));
  }
}

function* timer(time: number) {
  while (time > 0) {
    yield put(action.setResendTimeout(--time));
    yield delay(1000);
  }
}

function* confirmEmailWorker() {
  yield put(
    showToast({ text: getGlobalIntl()?.formatMessage(personalEmailMessages.updating) }),
  );
  const { emailCode }: ReturnType<typeof commonSelector> = yield select(commonSelector);
  try {
    const { email } = yield call(api, SCHEME.Profile.ConfirmEmailPost, {
      hash: emailCode,
    });
    yield put(action.changeUserEmail(email));
    yield call(appNavigate, MainScreensNames.Personal);
    yield put(action.setEditLoginStep(0));
    yield put(action.setSettingsEmail(''));
    yield put(hideToast());
    yield put(action.clearSettings());
  } catch (e) {
    if (e.code === 'fatal') {
      // TODO: should be not 'fatal'
      yield put(displayEmailError());
    } else {
      yield put(displayToastError(e.message));
    }
  } finally {
    yield put(setEmailCode(''));
    yield put(setGACode(''));
  }
}

function* faceIdWorker() {
  try {
    const faceIDPermission = PERMISSIONS.IOS.FACE_ID;
    const faceIdCheckResult = yield check(faceIDPermission);
    const intl = getGlobalIntl();

    if (faceIdCheckResult === RESULTS.DENIED) {
      const faceIDPermissionResult = yield request(faceIDPermission, {
        title: intl?.formatMessage(securityMessages.faceIdPermissionTitle)!,
        buttonPositive: 'OK',
        buttonNegative: intl?.formatMessage(securityMessages.dontAllow),
        message: intl?.formatMessage(securityMessages.faceIdPermissionBody)!,
      });
      if (faceIDPermissionResult === RESULTS.GRANTED) {
        yield put(profileActions.setBiometrics(BiometryEnum.faceID));
      }
    } else if (faceIdCheckResult === RESULTS.BLOCKED) {
      Alert.alert(
        intl?.formatMessage(securityMessages.faceIdOff)!,
        intl?.formatMessage(securityMessages.turnOnFaceIdInSettings)!,
        [
          {
            text: intl?.formatMessage(securityMessages.settings),
            onPress: () => {
              openSettings().catch((err) => console.log(err));
            },
          },
          {
            text: 'OK',
          },
        ],
      );
    } else {
      yield put(profileActions.setBiometrics(BiometryEnum.faceID));
    }
  } catch (err) {
    console.log(err);
  }
}

function* clearStateWorker() {
  yield put(action.clearProfile());
}

export function* rootProfileSaga() {
  yield takeLatest(action.requestSignOut, signOutWorker);
  yield takeLatest(action.requestUpdateLogin, updateLoginWorker);
  yield takeLatest(action.sendEmailCode, sendEmailCodeWorker);
  yield takeLatest(action.confirmEmail, confirmEmailWorker);
  yield takeLatest(action.requestFaceIdUsage, faceIdWorker);
  yield takeLatest(action.signOutSuccess, clearStateWorker);
}
