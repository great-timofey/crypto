import { AppState } from './store';

import { Currency } from '$global/types';
import { CurrenciesItem } from '$redux/wallets/interface';

export const authSelector = (state: AppState) => state.auth;
export const profileSelector = (state: AppState) => state.profile;
export const userSelector = (state: AppState) => state.profile.user;
export const commonSelector = (state: AppState) => state.common;
export const balancesSelector = (state: AppState) => state.balances;
export const notificationsSelector = (state: AppState) => state.notifications;
export const notificationsCountSelector = (state: AppState) =>
  state.notifications.unreadCount;
export const walletsSelector = (state: AppState) => state.wallets;
export const walletSelector = (state: AppState) => state.wallets.wallet;
export const lastWalletHistoryItemSelector = (state: AppState) =>
  state.wallets.wallet.history.items[0];
export const balanceSelector = (state: AppState) => state.wallets.balance;

export const swapSelector = (state: AppState) => state.swap;

export const refillSelector = (state: AppState) => state.wallets.refill;
export const refillMethodsSelector = (state: AppState) => state.wallets.refill.methods;
export const refillBanksSelector = (state: AppState) => state.wallets.refill.banks;
export const refillBankSelector = (code: string) => (state: AppState) =>
  state.wallets.refill.banks.find((b) => b.code === code);
export const refillBankCodeSelector = (state: AppState) => state.wallets.refill.bankCode;
export const refillBanksLoadingSelector = (state: AppState) =>
  state.wallets.refill.banksLoading;

export const withdrawSelector = (state: AppState) => state.wallets.withdraw;
export const withdrawMethodsSelector = (state: AppState) =>
  state.wallets.withdraw.methods;
export const withdrawBanksSelector = (state: AppState) => state.wallets.withdraw.banks;
export const withdrawBankSelector = (code: string) => (state: AppState) =>
  state.wallets.withdraw.banks.find((b) => b.code === code);
export const withdrawBankCodeSelector = (state: AppState) =>
  state.wallets.withdraw.bankCode;
export const withdrawBanksLoadingSelector = (state: AppState) =>
  state.wallets.withdraw.banksLoading;

export const appIsReadySelector = (state: AppState) => state.common.appIsReady;
export const currenciesSelector = (state: AppState) =>
  Object.values(state.wallets.currencies) as CurrenciesItem[];
export const currenciesForSwapSelector = (state: AppState) =>
  Object.values(state.wallets.currencies as CurrenciesItem)
    .filter((c) => c.canExchange)
    .sort((a, b) => (a.name > b.name ? 1 : -1));
export const currencySelector = (currency: Currency) => (state: AppState) =>
  state.wallets.currencies[currency.toLowerCase()] as CurrenciesItem;

export const overallAvailableSelector = (currency: Currency) => (state: AppState) =>
  [...state.wallets.balances, ...state.wallets.wallets].find(
    (i) => i.currency === currency,
  )?.amount || 0;
