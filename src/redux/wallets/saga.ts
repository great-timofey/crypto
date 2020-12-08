import { put, all, call, delay, takeLatest, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  displayGAError,
  displayToastError,
  displayToastSuccess,
  hideToast,
  setGACode,
  showToast,
} from '../common/actions';
import { AppState } from '../store';
import { profileActions } from '../profile';

import { Balance, Wallet } from './interface';

import { walletsActions as action } from './index';

import { PAGINATE_PAGE_COUNT } from '$global/constants';
import { profileSelector, walletsSelector } from '$redux/selectors';
import { AsyncStorageKeysEnum } from '$global/asyncStorageKeys';
import { getGlobalIntl } from '$i18n/globalIntl';
import { api } from '$services/api';
import SCHEME from '$services/schema';
import ToastMessages from '$i18n/shared/Toast.messages';
import CurrenciesMessages from '$i18n/shared/currencies.messages';
import { appNavigate } from '$navigation/utils';
import { MainScreensNames } from '$navigation/names';
import { FiatCurrency } from '$global/types';
import { fetchBalancesWorker } from '$redux/balances/saga';

export function* loadCurrenciesWorker() {
  const currencies = yield call(api, SCHEME.Wallet.CurrenciesGet);
  yield put(action.setCurrencies(currencies));
}

function* checkLoginWorker() {
  const {
    send: { login },
  }: ReturnType<typeof walletsSelector> = yield select(walletsSelector);

  yield put(
    showToast({
      text: getGlobalIntl()?.formatMessage(ToastMessages.checking),
    }),
  );

  try {
    yield call(api, SCHEME.Profile.CheckLoginPost, {
      login,
    });
    yield put(hideToast());
    yield put(action.setSendActiveStepIndex(1));
  } catch (e) {
    if (e.code === 'login_not_found') {
      yield put(
        displayToastError(
          getGlobalIntl()?.formatMessage(ToastMessages.sendCoinsUserNotExist, { login }),
        ),
      );
    } else {
      yield put(displayToastError(e.message));
    }
  }
}

export function* fetchWalletsWorker() {
  const {
    profile: { isWithdrawDisabled },
  }: AppState = yield select();

  const [{ wallets, balances }, { limits }]: [
    {
      wallets: Wallet[];
      balances: Balance[];
    },
    {
      limits: {
        [key: string]: { fee: number; min: number };
      };
    },
  ] = yield all([
    call(api, SCHEME.Fiat_wallet.DefaultGet),
    isWithdrawDisabled ? { limits: {} } : call(api, SCHEME.Wallet.SendGet), // TODO: HACK get limits
  ]);
  yield put(
    action.setBalances(
      balances.map((b) => ({
        ...b,
        currency: b.currency.toLowerCase(),
      })) as Balance[],
    ),
  ); // TODO: HACK currency toLowerCase
  yield put(
    action.setWallets(
      isWithdrawDisabled
        ? wallets
        : wallets.map((wallet) => ({
            ...wallet,
            sendLimit: limits[wallet.currency],
          })),
    ),
  );
}

function* fetchWalletWorker() {
  const {
    wallets: {
      wallet: { id },
    },
  }: AppState = yield select();
  const response: Wallet = yield call(api, SCHEME.Wallet['%n:idGet'], {
    id,
  });
  return response;
}

function* fetchBalanceWorker() {
  const {
    wallets: {
      balance: { id },
    },
  }: AppState = yield select();
  const response: Balance = yield call(api, SCHEME.Balance['%n:idGet'], {
    id,
  });
  return response;
}

export function* loadWalletsWorker() {
  yield put(action.setLoadingStatus(true));
  try {
    yield fetchWalletsWorker();
  } finally {
    yield put(action.setLoadingStatus(false));
  }
}

function* refreshWalletsWorker() {
  yield put(action.setRefreshStatus(true));
  try {
    yield fetchWalletsWorker();
  } catch (e) {
    yield put(displayToastError(e.message));
  } finally {
    yield put(action.setRefreshStatus(false));
  }
}

function* loadWalletWorker(a: PayloadAction<Wallet['id']>) {
  yield put(action.choiceWallet(a.payload));
  yield put(action.setWalletLoadingStatus(true));
  yield loadWalletHistoryWorker();
  yield put(action.setWalletLoadingStatus(false));
}

function* refreshWalletWorker() {
  yield put(action.setWalletRefreshStatus(true));
  try {
    const [wallet]: [Wallet] = yield all([
      fetchWalletWorker(),
      loadWalletHistoryWorker(),
    ]);
    yield put(action.setWallet(wallet));
  } catch (e) {
    yield put(displayToastError(e.message));
  }
  yield put(action.setWalletRefreshStatus(false));
}

function* refreshBalanceWorker() {
  yield put(action.setBalanceRefreshStatus(true));
  try {
    const [balance]: [Balance] = yield all([
      fetchBalanceWorker(),
      loadBalanceHistoryWorker(),
    ]);
    yield put(action.setBalance(balance));
  } catch (e) {
    yield put(displayToastError(e.message));
  }
  yield put(action.setBalanceRefreshStatus(false));
}

function* loadBalanceWorker(a: PayloadAction<Balance['id']>) {
  yield put(action.choiceBalance(a.payload));
  yield put(action.setBalanceLoadingStatus(true));
  yield loadBalanceHistoryWorker();
  yield put(action.setBalanceLoadingStatus(false));
}

function* loadBalanceHistoryWorker() {
  const {
    wallets: { balance },
  }: // common: { gaCode },
  AppState = yield select();
  try {
    if (balance.id && balance.history.next !== null) {
      yield put(action.setBalanceHistoryError(false));
      yield put(action.setBalanceHistoryLoading(true));
      const history = yield call(api, SCHEME.History.DefaultGet, {
        count: PAGINATE_PAGE_COUNT,
        balanceId: balance.id,
        startFrom: balance.history.next,
      });
      yield put(action.setBalanceHistory(history));
    }
  } catch (err) {
    console.log(err.message);
    yield put(action.setBalanceHistoryError(true));
  } finally {
    yield put(action.setBalanceHistoryLoading(false));
  }
}

function* loadWalletHistoryWorker() {
  const {
    wallets: { wallet },
  }: AppState = yield select();
  try {
    if (wallet.id && wallet.history.next !== null) {
      yield put(action.setWalletHistoryError(false));
      yield put(action.setWalletHistoryLoading(true));
      const history = yield call(api, SCHEME.History.DefaultGet, {
        walletId: wallet.id,
        startFrom: wallet.history.next,
        count: PAGINATE_PAGE_COUNT,
      });
      yield put(action.setWalletHistory(history));
    }
  } catch (err) {
    yield put(action.setWalletHistoryError(true));
  } finally {
    yield put(action.setWalletHistoryLoading(false));
  }
}

function* transferSendWorker() {
  const {
    wallets: { send, wallet },
    common: { gaCode },
  }: AppState = yield select();
  try {
    yield put(showToast({ text: getGlobalIntl()?.formatMessage(ToastMessages.sending) }));
    yield call(api, SCHEME.Profile.CheckLoginPost, { login: send.login });
    try {
      const response = yield call(api, SCHEME.Wallet.TransferSendPut, {
        walletId: wallet.id,
        login: send.login,
        amount: send.amount,
        gaCode,
      });
      yield put(
        action.updateWallet({
          wallet: response.wallet,
          transaction: response.transfer,
        }),
      );
      yield put(hideToast());
      yield call(appNavigate, MainScreensNames.CurrencySendSuccess);
      yield put(action.clearTransferState());
      yield fetchBalancesWorker();
    } catch (e) {
      if (e.code === 'ga_auth_code_incorrect') {
        yield put(hideToast());
        yield put(displayGAError());
      } else {
        yield put(displayToastError(e.message));
      }
      yield put(setGACode(''));
    }
  } catch (e) {
    // TODO: Add error handler address_incorrect, insufficient_funds
    if (e.code === 'login_not_found') {
      yield put(
        displayToastError(getGlobalIntl()?.formatMessage(ToastMessages.loginNotFound)),
      );
      yield put(action.setSendActiveStepIndex(0));
    } else {
      yield put(displayToastError(e.message));
    }
  }
}

function* transactionSendWorker() {
  const {
    wallets: { send, wallet },
    common: { gaCode },
  }: AppState = yield select();
  yield put(showToast({ text: getGlobalIntl()?.formatMessage(ToastMessages.sending) }));
  try {
    const response = yield call(api, SCHEME.Wallet.TransactionSendPut, {
      walletId: wallet.id,
      address: send.address,
      amount: send.amount,
      gaCode,
    });
    yield put(
      action.updateWallet({
        wallet: response.wallet,
        transaction: response.transaction,
      }),
    );
    yield put(hideToast());
    yield call(appNavigate, MainScreensNames.CurrencySendSuccess);
    yield put(action.clearTransferState());
    yield fetchBalancesWorker();
  } catch (e) {
    // TODO: Add error handler address_incorrect, insufficient_funds
    yield put(displayToastError(e.message));
    yield put(setGACode(''));
  }
}

function* loadRefillMethodsWorker() {
  try {
    yield put(action.setRefillMethodsLoadingStatus(true));
    const { methods } = yield call(api, SCHEME.Fiat_wallet.RefillMethodsGet);
    yield put(action.setRefillMethods(methods));
  } catch (err) {
    yield put(displayToastError(err.message));
  } finally {
    yield put(action.setRefillMethodsLoadingStatus(false));
  }
}

function* loadWithdrawMethodsWorker() {
  try {
    yield put(action.setWithdrawMethodsLoadingStatus(true));
    const { methods } = yield call(api, SCHEME.Fiat_wallet.WithdrawMethodsGet);
    yield put(action.setWithdrawMethods(methods));
  } catch (err) {
    yield put(displayToastError(err.message));
  } finally {
    yield put(action.setWithdrawMethodsLoadingStatus(false));
  }
}

function* loadRefillBanksWorker() {
  try {
    yield put(action.setRefillBanksLoadingStatus(true));
    const banks = yield call(api, SCHEME.Fiat_wallet.Xendit.RefillBanksGet);
    yield put(action.setRefillBanks(banks));
  } catch (err) {
    yield put(displayToastError(err.message));
  } finally {
    yield put(action.setRefillBanksLoadingStatus(false));
  }
}

function* loadWithdrawBanksWorker() {
  try {
    yield put(action.setWithdrawBanksLoadingStatus(true));
    const banks = yield call(api, SCHEME.Fiat_wallet.Xendit.WithdrawalBanksGet);
    yield put(action.setWithdrawBanks(banks));
  } catch (err) {
    yield put(displayToastError(err.message));
  } finally {
    yield put(action.setWithdrawBanksLoadingStatus(false));
  }
}

function* createWithdrawWorker() {
  const {
    wallets: { withdraw, balance },
  }: AppState = yield select();

  yield put(
    showToast({
      text: getGlobalIntl()?.formatMessage(CurrenciesMessages.weWithdrawFunds),
    }),
  );
  try {
    const response: {
      balance: Balance;
      transaction: any; // TODO: finish transaction
    } = yield call(api, SCHEME.Fiat_wallet.WithdrawPut, {
      bankCode: withdraw.bankCode,
      amount: withdraw.amount,
      accountHolderName: withdraw.accountHolderName,
      accountNumber: withdraw.accountNumber,
      balanceId: balance.id,
    });
    response.balance.currency = response.balance.currency.toLowerCase() as FiatCurrency; // TODO: HACK

    yield put(
      action.updateBalance({
        balance: response.balance,
        transaction: response.transaction,
      }),
    );

    yield put(
      displayToastSuccess(
        getGlobalIntl()?.formatMessage(CurrenciesMessages.withdrawalSuccessfully),
      ),
    );
    yield call(appNavigate, MainScreensNames.Wallet);
    yield delay(1500);
    yield put(action.cleanWithdraw());
    yield fetchBalancesWorker();
  } catch (e) {
    yield put(displayToastError(e.message));
  }
}

function* currencySendAddressWarningSeenLoginCheckWorker() {
  const {
    user: { id },
  }: ReturnType<typeof profileSelector> = yield select(profileSelector);

  const warningSeenData: string | null = yield AsyncStorage.getItem(
    AsyncStorageKeysEnum.currencySendAddressWarningSeenForUser,
  );

  const userHasSeenWarning = warningSeenData?.split(';').includes(id.toString()) ?? false;

  yield put(action.setCurrencySendAddressWarningSeen(userHasSeenWarning));
}

function* currencySendAddressWarningSeenUpdateWorker() {
  const {
    user: { id },
  }: ReturnType<typeof profileSelector> = yield select(profileSelector);

  const warningSeenData: string | null = yield AsyncStorage.getItem(
    AsyncStorageKeysEnum.currencySendAddressWarningSeenForUser,
  );

  const updatedSeenDataByUser = (warningSeenData ?? '').concat(`${id};`);

  yield AsyncStorage.setItem(
    AsyncStorageKeysEnum.currencySendAddressWarningSeenForUser,
    updatedSeenDataByUser,
  );
}

function* clearStateWorker() {
  yield put(action.clearWallets());
}

export function* rootWalletSaga() {
  yield takeLatest(action.loadWallets, loadWalletsWorker);
  yield takeLatest(action.refreshWallets, refreshWalletsWorker);
  yield takeLatest(action.refreshWallet, refreshWalletWorker);
  yield takeLatest(action.refreshBalance, refreshBalanceWorker);
  yield takeLatest(action.loadWallet, loadWalletWorker);
  yield takeLatest(action.loadBalance, loadBalanceWorker);
  yield takeLatest(action.loadBalanceHistory, loadBalanceHistoryWorker);
  yield takeLatest(action.loadWalletHistory, loadWalletHistoryWorker);
  yield takeLatest(action.transferSend, transferSendWorker);
  yield takeLatest(action.transactionSend, transactionSendWorker);
  yield takeLatest(action.loadRefillMethods, loadRefillMethodsWorker);
  yield takeLatest(action.loadRefillBanks, loadRefillBanksWorker);
  yield takeLatest(action.loadWithdrawMethods, loadWithdrawMethodsWorker);
  yield takeLatest(action.loadWithdrawBanks, loadWithdrawBanksWorker);
  yield takeLatest(action.createWithdraw, createWithdrawWorker);
  yield takeLatest(action.checkLogin, checkLoginWorker);
  yield takeLatest(profileActions.signOutSuccess, clearStateWorker);
  yield takeLatest(
    action.updateCurrencySendAddressWarningSeen,
    currencySendAddressWarningSeenUpdateWorker,
  );
  yield takeLatest(
    profileActions.setProfile,
    currencySendAddressWarningSeenLoginCheckWorker,
  );
}
