import { call, delay, put, race, select, take, takeLatest } from 'redux-saga/effects';

import { displayToastError, hideToast, showToast } from '../common/actions';
import { AppState } from '../store';

import { swapActions as actions } from './index';

import { api } from '$services/api';
import SCHEME from '$services/schema';
import { appNavigate } from '$navigation/utils';
import { MainScreensNames } from '$navigation/names';
import { getGlobalIntl } from '$i18n/globalIntl';
import ToastMessages from '$i18n/shared/Toast.messages';
import { walletsActions } from '$redux/wallets';
import { ApiFiatWalletExchangePostResponse } from '$services/api.interface';
import { refreshBalanceWorker } from '$redux/balances/saga';
import { profileActions as action } from '$redux/profile';

function* getRate() {
  try {
    yield put(actions.setRateLoading(true));
    const {
      swap: { fromCurrency, toCurrency },
    }: AppState = yield select();
    const { rate } = yield call(api, SCHEME.Fiat_wallet.RateGet, {
      base: fromCurrency,
      currency: toCurrency,
    });

    if (rate) {
      yield put(actions.setRate(rate));
      yield put(actions.setActualRate(true));
    }
  } catch (e) {
    yield put(displayToastError(e.message));
  } finally {
    yield put(actions.setRateLoading(false));
  }
}

function* poolRate() {
  while (true) {
    yield getRate();
    yield delay(5000);
  }
}

function* watchPollRate() {
  while (true) {
    yield take(actions.startPoolingRate);
    yield race([call(poolRate), take(actions.stopPoolingRate)]);
  }
}

function* exchangeWorker() {
  const {
    swap: { amountType, amount, fromCurrency, toCurrency },
  }: AppState = yield select();

  yield put(
    showToast({
      text: getGlobalIntl()?.formatMessage(ToastMessages.swapping),
    }),
  );

  try {
    const { wallet, balance, history }: ApiFiatWalletExchangePostResponse = yield call(
      api,
      SCHEME.Fiat_wallet.ExchangePost,
      {
        amountType,
        fromCurrency,
        toCurrency,
        amount,
      },
    );
    yield put(hideToast());
    yield call(appNavigate, MainScreensNames.SwapSuccess);
    yield put(actions.clearState());

    yield put(
      walletsActions.updateWallet({
        wallet,
        transaction: history,
      }),
    );

    yield put(
      walletsActions.updateBalance({
        balance,
        transaction: history,
      }),
    );

    yield refreshBalanceWorker();
  } catch (e) {
    yield put(displayToastError(e.message));
  }
}

function* updateCurrency() {
  yield put(actions.stopPoolingRate());
  yield put(actions.setActualRate(false));
  yield put(actions.startPoolingRate());
}

function* clearStateWorker() {
  yield put(actions.clearState());
}

export function* rootSwapSaga() {
  yield takeLatest(actions.exchange, exchangeWorker);
  yield takeLatest(actions.setFromCurrency, updateCurrency);
  yield takeLatest(actions.setToCurrency, updateCurrency);
  yield takeLatest(action.signOutSuccess, clearStateWorker);
  yield watchPollRate();
}
