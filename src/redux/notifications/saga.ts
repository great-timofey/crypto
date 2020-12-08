import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
  setLoadingNotifications,
  loadUnreadCountRequest,
  setUnreadCount,
  setNotifications,
  addNotifications,
  loadNotificationRequest,
  refreshNotificationRequest,
  setRefreshingNotifications,
  setLoadingError,
  clearNotification,
} from './index';

import { api } from '$services/api';
import SCHEME from '$services/schema';
import { displayToastError } from '$redux/common/actions';
import { AppState } from '$redux/store';
import { PAGINATE_PAGE_COUNT } from '$global/constants';
import { profileActions } from '$redux/profile';

function* fetchNotificationsWorker() {
  const {
    notifications: {
      notifications: { next },
    },
  }: AppState = yield select();
  const notifications = yield call(api, SCHEME.Notification.DefaultGet, {
    count: PAGINATE_PAGE_COUNT,
    startFrom: next,
  });
  return notifications;
}

function* loadNotificationsWorker() {
  yield put(setLoadingNotifications(true));
  try {
    yield put(setLoadingError(false));
    const notifications = yield fetchNotificationsWorker();
    yield put(addNotifications(notifications));
  } catch (e) {
    console.log(e.message);
    yield put(setLoadingError(true));
  }
  yield put(setLoadingNotifications(false));
}

function* refreshNotificationsWorker() {
  yield put(setRefreshingNotifications(true));
  try {
    const notifications = yield fetchNotificationsWorker();
    yield put(setNotifications(notifications));
  } catch (e) {
    yield put(displayToastError(e.message));
  }
  yield put(setRefreshingNotifications(false));
}

function* loadUnreadCountWorker() {
  try {
    const { count } = yield call(api, SCHEME.Notification.UnreadCountGet);
    yield put(setUnreadCount(count));
  } catch (e) {
    yield put(displayToastError(e.message));
  }
}

function* resetStateWorker() {
  yield put(clearNotification());
}

export function* rootNotificationsSaga() {
  yield takeLatest(loadNotificationRequest, loadNotificationsWorker);
  yield takeLatest(loadUnreadCountRequest, loadUnreadCountWorker);
  yield takeLatest(refreshNotificationRequest, refreshNotificationsWorker);
  yield takeLatest(profileActions.signOutSuccess, resetStateWorker);
}
