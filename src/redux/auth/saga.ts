import { takeEvery, select, call, put, delay, fork } from 'redux-saga/effects';

import { authSelector, commonSelector } from '../selectors';
import {
  setNeedGA,
  showToast,
  hideToast,
  showBlurView,
  setGACode,
  displayToastError,
  displayGAError,
  displayEmailError,
  setEmailCode,
  displayToastSuccess,
} from '../common/actions';
import { loadProfileWorker } from '../profile/saga';

import { authActions } from './index';

import { api } from '$services/api';
import { PUBLIC_KEY, APP_ID } from '$services/config';
import SCHEME from '$services/schema';
import ToastMessages from '$i18n/shared/Toast.messages';
import { getGlobalIntl } from '$i18n/globalIntl';
import { appNavigate } from '$navigation/utils';
import { AuthScreensNames } from '$navigation/names';
import { profileActions } from '$redux/profile';

function* signInWorker() {
  const { devMode }: ReturnType<typeof commonSelector> = yield select(commonSelector);
  const { login, password, recaptcha }: ReturnType<typeof authSelector> = yield select(
    authSelector,
  );

  try {
    if (!login) {
      yield put(
        displayToastError(getGlobalIntl()?.formatMessage(ToastMessages.signInLoginNeed)),
      );
      yield put(authActions.setAuthorizationActiveStepIndex(0));
      return;
    }

    if (!password) {
      yield put(
        displayToastError(
          getGlobalIntl()?.formatMessage(ToastMessages.signInPasswordNeed),
        ),
      );
      return;
    }

    if (!recaptcha && !devMode) {
      yield put(showBlurView());
      return;
    }

    yield put(
      showToast({
        text: getGlobalIntl()?.formatMessage(ToastMessages.checking),
      }),
    );
    const response = yield call(api, SCHEME.Profile.SignInPost, {
      login,
      password,
      recaptchaResponse: recaptcha,
      publicKey: PUBLIC_KEY,
      appId: APP_ID,
    });

    if (response?.needGaCode) {
      yield put(hideToast());
      yield put(setNeedGA(true));
    } else {
      yield loadProfileWorker();
      yield put(hideToast());
    }
  } catch (error) {
    if (error?.code === 'recaptcha_needed') {
      //  need fill recaptcha
      yield put(
        displayToastError(
          getGlobalIntl()?.formatMessage(ToastMessages.signInRecaptchaNeed),
        ),
      );
      yield put(showBlurView());
    } else if (error?.code === 'fatal') {
      //  invalid credentials
      console.log('wrong login or password', error.message);

      yield put(
        displayToastError(
          getGlobalIntl()?.formatMessage(ToastMessages.signInIncorrectCredentials),
        ),
      );

      yield put(authActions.clearAuthData());
    } else {
      //  rest errors
      console.log('authorization unknown error', error.message);
      yield put(
        displayToastError(
          getGlobalIntl()?.formatMessage(ToastMessages.signInUnknownError),
        ),
      );
      yield put(authActions.clearAuthData());
    }
  }
}

function* signInTwoStepWorker() {
  const { login, password, recaptcha }: ReturnType<typeof authSelector> = yield select(
    authSelector,
  );
  const { gaCode }: ReturnType<typeof commonSelector> = yield select(commonSelector);

  try {
    yield put(
      showToast({
        text: getGlobalIntl()?.formatMessage(ToastMessages.checking),
      }),
    );
    yield call(api, SCHEME.Profile.SignInTwoStepPost, {
      login,
      password,
      recaptchaResponse: recaptcha,
      publicKey: PUBLIC_KEY,
      gaCode,
    });

    yield loadProfileWorker();
  } catch (error) {
    yield put(hideToast());
    yield put(displayGAError());
  } finally {
    yield put(setGACode(''));
    yield put(hideToast());
  }
}

function* sendEmailForSignUpWorker() {
  const { devMode }: ReturnType<typeof commonSelector> = yield select(commonSelector);
  const { recaptcha, email }: ReturnType<typeof authSelector> = yield select(
    authSelector,
  );

  if (!recaptcha && !devMode) {
    yield put(showBlurView());
    return;
  }

  yield put(
    showToast({
      text: getGlobalIntl()?.formatMessage(ToastMessages.sending),
    }),
  );

  try {
    const { csrfToken, resendTimeout } = yield call(api, SCHEME.Profile.SignUpPut, {
      // appId: APP_ID,
      email,
      recaptchaResponse: recaptcha,
    });
    yield put(
      authActions.setAuthField({
        key: 'csrfToken',
        value: csrfToken,
      }),
    );
    yield put(hideToast());
    yield put(authActions.setAuthorizationActiveStepIndex(1));
    yield fork(timer, resendTimeout);
  } catch (e) {
    yield put(displayToastError(e.message));
  } finally {
    yield put(authActions.setRecaptcha());
  }
}

function* checkEmailCodeWorker(
  action: ReturnType<typeof authActions.checkEmailCodeRequest>,
) {
  const { csrfToken }: ReturnType<typeof authSelector> = yield select(authSelector);

  const { emailCode }: ReturnType<typeof commonSelector> = yield select(commonSelector);

  yield put(
    showToast({
      text: getGlobalIntl()?.formatMessage(ToastMessages.checking),
    }),
  );

  try {
    const { hash } = yield call(api, SCHEME.Profile.VerifyMobileCodeGet, {
      csrfToken,
      code: emailCode,
      type: action.payload,
    });
    yield put(setEmailCode(''));
    yield put(authActions.setHash(hash));
    yield put(hideToast());
    yield put(authActions.setAuthorizationActiveStepIndex(2));
  } catch (e) {
    yield put(setEmailCode(''));
    if (e.code === 'incorrect_code') {
      yield put(displayEmailError());
      yield put(hideToast());
    } else {
      yield put(displayToastError(e.message));
    }
  }
}

function* sendEmailForResetPasswordWorker() {
  const { devMode }: ReturnType<typeof commonSelector> = yield select(commonSelector);
  const { email, recaptcha }: ReturnType<typeof authSelector> = yield select(
    authSelector,
  );

  if (!recaptcha && !devMode) {
    yield put(showBlurView());
    return;
  }

  yield put(
    showToast({
      text: getGlobalIntl()?.formatMessage(ToastMessages.sending),
    }),
  );

  try {
    const { resendTimeout, csrfToken } = yield call(
      api,
      SCHEME.Profile.ResetPasswordPost,
      {
        email,
        recaptchaResponse: recaptcha,
      },
    );
    yield fork(timer, resendTimeout);

    yield put(
      authActions.setAuthField({
        key: 'csrfToken',
        value: csrfToken,
      }),
    );
    yield put(hideToast());
    yield put(authActions.setAuthorizationActiveStepIndex(1));
    yield fork(timer, resendTimeout);
  } catch (e) {
    yield put(displayToastError(e.message));
  } finally {
    yield put(authActions.setRecaptcha());
  }
}

function* signUpWorker() {
  const {
    hash,
    password,
    login,
    firstName,
    lastName,
  }: ReturnType<typeof authSelector> = yield select(authSelector);
  const { emailCode }: ReturnType<typeof commonSelector> = yield select(commonSelector);

  yield put(
    showToast({ text: getGlobalIntl()?.formatMessage(ToastMessages.registration) }),
  );

  try {
    yield call(api, SCHEME.Profile.FillAccountPut, {
      code: emailCode,
      password,
      hash,
      login,
      firstName,
      lastName,
    });
    yield loadProfileWorker();
  } catch (e) {
    // TODO: Error handler
    yield put(displayToastError(e.message));
  } finally {
    yield put(hideToast());
  }
}

function* resetPasswordWorker() {
  const { password, hash }: ReturnType<typeof authSelector> = yield select(authSelector);

  yield put(showToast({ text: getGlobalIntl()?.formatMessage(ToastMessages.checking) }));
  try {
    yield call(api, SCHEME.Profile.ResetPasswordPut, {
      hash,
      password,
    });
    yield put(
      displayToastSuccess(
        getGlobalIntl()?.formatMessage(ToastMessages.passwordResetSuccessfully),
      ),
    );
    yield call(appNavigate, AuthScreensNames.Start);
    yield put(authActions.clearAuthData());
  } catch (e) {
    if (e.code === 'hash_incorrect') {
      yield put(displayEmailError());
      yield put(setEmailCode(''));
    }
    yield put(displayToastError(e.message));
  }
}

function* checkLoginWorker() {
  const { login }: ReturnType<typeof authSelector> = yield select(authSelector);

  yield put(
    showToast({
      text: getGlobalIntl()?.formatMessage(ToastMessages.checking),
    }),
  );

  try {
    yield call(api, SCHEME.Profile.CheckLoginPost, {
      login,
    });
    yield put(
      displayToastError(getGlobalIntl()?.formatMessage(ToastMessages.loginAlreadyExists)),
    );
  } catch (e) {
    if (e.code === 'login_not_found') {
      yield put(hideToast());
      yield put(authActions.setAuthorizationActiveStepIndex(3));
    }
  }
}

function* timer(time: number) {
  while (time > 0) {
    yield put(authActions.setTimer(--time));
    yield delay(1000);

    const { timer: reduxTimer }: ReturnType<typeof authSelector> = yield select(
      authSelector,
    );

    if (reduxTimer === 0) break;
  }
}

function* resetStateWorker() {
  yield put(authActions.clearAuthData());
}

function* cleanupTimersWorker() {
  yield put(authActions.setTimer(0));
}

export function* rootAuthSaga() {
  yield takeEvery(authActions.clearAuthData, cleanupTimersWorker);
  yield takeEvery(authActions.signInRequest, signInWorker);
  yield takeEvery(authActions.signUpRequest, signUpWorker);
  yield takeEvery(authActions.resetPasswordRequest, resetPasswordWorker);
  yield takeEvery(authActions.signInTwoStepRequest, signInTwoStepWorker);
  yield takeEvery(authActions.sendEmailForSignUpRequest, sendEmailForSignUpWorker);
  yield takeEvery(authActions.checkEmailCodeRequest, checkEmailCodeWorker);
  yield takeEvery(authActions.checkLoginRequest, checkLoginWorker);
  yield takeEvery(profileActions.signOutSuccess, resetStateWorker);
  yield takeEvery(
    authActions.sendEmailForResetPasswordRequest,
    sendEmailForResetPasswordWorker,
  );
}
