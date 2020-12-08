import { call, put, takeLatest } from 'redux-saga/effects';

import {
  loadBalance,
  setLoadingBalance,
  setRefreshBalance,
  setBalances,
  refreshBalance,
  clearBalancesStore,
} from './index';

import { api } from '$services/api';
import SCHEME from '$services/schema';
import { displayToast } from '$redux/common/actions';
import ToastMessages from '$i18n/shared/Toast.messages';
import { getGlobalIntl } from '$i18n/globalIntl';
import { profileActions } from '$redux/profile';

export function* fetchBalancesWorker() {
  try {
    const balances = yield call(api, SCHEME.Fiat_wallet.BalancesGet);
    yield put(
      setBalances({
        balances: {
          exchange: Object.values(balances.exchange)
            .map((i: any) => i.usdAmount)
            .reduce((a, b) => a + b, 0),
          fiat: Object.values(balances.fiat)
            .map((i: any) => i.usdAmount)
            .reduce((a, b) => a + b, 0),
          crypto: Object.values(balances.crypto)
            .map((i: any) => i.usdAmount)
            .reduce((a, b) => a + b, 0),
        },
        totalAmount: {
          usd: balances.usdAmount,
          btc: balances.btcAmount,
        },
      }),
    );
  } catch (e) {
    yield put(
      displayToast({
        text:
          e.message || getGlobalIntl()?.formatMessage(ToastMessages.failedLoadBalances),
        icon: 'attention',
        iconFill: 'error',
      }),
    );
  }
}

function* loadBalanceWorker() {
  yield put(setLoadingBalance(true));
  yield fetchBalancesWorker();
  yield put(setLoadingBalance(false));
}

export function* refreshBalanceWorker() {
  yield put(setRefreshBalance(true));
  yield fetchBalancesWorker();
  yield put(setRefreshBalance(false));
}

function* resetStateWorker() {
  yield put(clearBalancesStore());
}

export function* rootBalancesSaga() {
  yield takeLatest(loadBalance, loadBalanceWorker);
  yield takeLatest(refreshBalance, refreshBalanceWorker);
  yield takeLatest(profileActions.signOutSuccess, resetStateWorker);
}
