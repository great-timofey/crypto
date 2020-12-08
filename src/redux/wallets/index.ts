import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Balance,
  BalanceExtended,
  Currencies,
  WalletsState,
  Wallet,
  WalletExtended,
  WalletOperationEnum,
  RefillBank,
  WithdrawBank,
} from './interface';

import { HistoryListItem } from '$components/HistoryList/HistoryList.interface';

export const walletsReducerName = 'wallets';

const initialState: WalletsState = {
  loading: false,
  refresh: false,
  wallets: [],
  balances: [],
  currencies: {},
  wallet: {
    id: 0,
    amount: 0,
    currency: 'btc',
    align: 0,
    toUsd: 0,
    toBtc: 0,
    loading: false,
    refresh: false,
    status: 'generated',
    address: '',
    history: {
      error: false,
      loading: false,
      next: '0',
      items: [],
    },
    sendLimit: {
      min: 0,
      fee: 0,
    },
  },
  balance: {
    id: 0,
    amount: 0,
    currency: 'usd',
    align: 0,
    toUsd: 0,
    toBtc: 0,
    loading: false,
    refresh: false,
    history: {
      error: false,
      loading: false,
      next: '0',
      items: [],
    },
  },
  send: {
    type: WalletOperationEnum.transfer,
    activeStepIndex: 0,
    loading: false,
    address: '',
    login: '',
    amount: '',
    amountUsd: '',
  },
  refill: {
    bankCode: '',
    amount: '',
    methods: {},
    banksLoading: false,
    methodsLoading: false,
    banks: [],
  },
  withdraw: {
    bankCode: '',
    banksLoading: false,
    methodsLoading: false,
    banks: [],
    amount: '',
    accountNumber: '',
    accountHolderName: '',
    methods: {},
  },
  currencySendAddressWarningSeen: false,
};

const wallets = createSlice({
  name: walletsReducerName,
  initialState,
  reducers: {
    loadWallets() {},
    refreshWallets() {},
    loadRefillBanks() {},
    loadWithdrawBanks() {},
    createWithdraw() {},
    setRefillBanks: (state, action: PayloadAction<RefillBank[]>) => {
      state.refill.banks = action.payload;
    },
    setWithdrawBanks: (state, action: PayloadAction<WithdrawBank[]>) => {
      state.withdraw.banks = action.payload;
    },
    setRefillBanksLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.refill.banksLoading = action.payload;
    },
    setWithdrawBanksLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.withdraw.banksLoading = action.payload;
    },
    setRefillMethodsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.refill.methodsLoading = action.payload;
    },
    setWithdrawMethodsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.withdraw.methodsLoading = action.payload;
    },
    loadRefillMethods() {},
    loadWithdrawMethods() {},
    setRefillMethods: (
      state,
      action: PayloadAction<WalletsState['refill']['methods']>,
    ) => {
      state.refill.methods = action.payload;
    },
    setWithdrawMethods: (
      state,
      action: PayloadAction<WalletsState['withdraw']['methods']>,
    ) => {
      state.withdraw.methods = action.payload;
    },
    setRefillAmount: (state, action: PayloadAction<string>) => {
      state.refill.amount = action.payload;
    },
    setRefillBankCode: (state, action: PayloadAction<string>) => {
      state.refill.bankCode = action.payload;
    },
    setWithdrawBankCode: (state, action: PayloadAction<string>) => {
      state.withdraw.bankCode = action.payload;
    },
    setWithdrawAmount: (state, action: PayloadAction<string>) => {
      state.withdraw.amount = action.payload;
    },
    setWithdrawAccountNumber: (state, action: PayloadAction<string>) => {
      state.withdraw.accountNumber = action.payload;
    },
    setWithdrawAccountHolderName: (state, action: PayloadAction<string>) => {
      state.withdraw.accountHolderName = action.payload;
    },
    loadWithdrawalMethods() {},
    setLoadingStatus(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setRefreshStatus(state, action: PayloadAction<boolean>) {
      state.refresh = action.payload;
    },
    choiceWallet(state, action: PayloadAction<Wallet['id']>) {
      state.wallet = {
        ...initialState.wallet,
        ...state.wallets.find((w) => w.id === action.payload),
      };
      state.balance = initialState.balance;
    },
    // @ts-ignore
    loadWallet(state, action: PayloadAction<Wallet['id']>) {},
    refreshWallet() {},
    refreshBalance() {},
    setWalletLoadingStatus(state, action: PayloadAction<boolean>) {
      state.wallet.loading = action.payload;
    },
    setWalletRefreshStatus(state, action: PayloadAction<boolean>) {
      state.wallet.refresh = action.payload;
    },
    setBalanceRefreshStatus(state, action: PayloadAction<boolean>) {
      state.wallet.refresh = action.payload;
    },
    cleanWithdraw: (state) => {
      state.withdraw = initialState.withdraw;
    },
    cleanRefill: (state) => {
      state.refill = initialState.refill;
    },
    updateBalance: (
      state,
      action: PayloadAction<{
        balance: Balance;
        transaction: HistoryListItem;
      }>,
    ) => {
      const newBalance = action.payload.balance;
      state.balances = state.balances.map((balance) => {
        return balance.id === newBalance.id ? newBalance : balance;
      });
      if (state.balance.id === newBalance.id) {
        state.balance = {
          ...state.balance,
          ...newBalance,
          history: {
            ...state.balance.history,
            items: [action.payload.transaction, ...state.balance.history.items],
          },
        };
      }
    },
    updateWallet: (
      state,
      action: PayloadAction<{
        wallet: Wallet;
        transaction: HistoryListItem;
      }>,
    ) => {
      const newWallet = action.payload.wallet;
      state.wallets = state.wallets.map((wallet) => {
        return wallet.id === newWallet.id ? newWallet : wallet;
      });
      if (state.wallet.id === newWallet.id) {
        state.wallet = {
          ...state.wallet,
          ...newWallet,
          history: {
            ...state.wallet.history,
            items: [action.payload.transaction, ...state.wallet.history.items],
          },
        };
      }
    },
    loadWalletHistory() {},
    setWalletHistory(state, action: PayloadAction<WalletExtended['history']>) {
      state.wallet.history = {
        ...state.wallet.history,
        next: action.payload.next,
        items: [...state.wallet.history.items, ...action.payload.items],
      };
    },
    setWalletHistoryLoading(state, action: PayloadAction<boolean>) {
      state.wallet.history.loading = action.payload;
    },
    setWalletHistoryError(state, action: PayloadAction<boolean>) {
      state.wallet.history.error = action.payload;
    },
    loadBalanceHistory() {},
    choiceBalance(state, action: PayloadAction<Balance['id']>) {
      state.balance = {
        ...initialState.balance,
        ...state.balances.find((w) => w.id === action.payload),
      };
      state.wallet = initialState.wallet;
    },
    // @ts-ignore
    loadBalance(state, action: PayloadAction<Balance['id']>) {},
    setBalanceHistory(state, action: PayloadAction<BalanceExtended['history']>) {
      state.balance.history = {
        ...state.balance.history,
        next: action.payload.next,
        items: [...state.balance.history.items, ...action.payload.items],
      };
    },
    setBalanceLoadingStatus(state, action: PayloadAction<boolean>) {
      state.balance.loading = action.payload;
    },
    setBalanceHistoryLoading(state, action: PayloadAction<boolean>) {
      state.balance.history.loading = action.payload;
    },
    setBalanceHistoryError(state, action: PayloadAction<boolean>) {
      state.balance.history.error = action.payload;
    },
    setWallets(state, action: PayloadAction<Wallet[]>) {
      state.wallets = action.payload;
    },
    setWallet(state, action: PayloadAction<Wallet>) {
      state.wallet = {
        ...state.wallet,
        ...action.payload,
      };
      state.wallets = state.wallets.map((w) =>
        w.id === action.payload.id ? action.payload : w,
      );
    },
    setBalance(state, action: PayloadAction<Balance>) {
      state.balance = {
        ...state.balance,
        ...action.payload,
      };
      state.balances = state.balances.map((b) =>
        b.id === action.payload.id ? action.payload : b,
      );
    },
    setCurrencies(state, action: PayloadAction<Currencies>) {
      state.currencies = action.payload;
    },
    setBalances(state, action: PayloadAction<Array<Balance>>) {
      state.balances = action.payload;
    },
    transactionSend() {},
    transferSend() {},
    setSendAddress(state, action: PayloadAction<string>) {
      state.send.address = action.payload;
    },
    setSendType(state, action: PayloadAction<WalletsState['send']['type']>) {
      state.send.type = action.payload;
    },
    setSendLoading(state, action: PayloadAction<boolean>) {
      state.send.loading = action.payload;
    },
    setSendLogin(state, action: PayloadAction<string>) {
      state.send.login = action.payload;
    },
    setSendAmount(state, action: PayloadAction<string>) {
      state.send.amount = action.payload;
    },
    setSendAmountUsd(state, action: PayloadAction<string>) {
      state.send.amountUsd = action.payload;
    },
    setSendActiveStepIndex(state, action: PayloadAction<number>) {
      state.send.activeStepIndex = action.payload;
    },
    checkLogin() {},
    clearTransferState(state) {
      state.send = initialState.send;
    },
    setCurrencySendAddressWarningSeen(state, action: PayloadAction<boolean>) {
      state.currencySendAddressWarningSeen = action.payload;
    },
    updateCurrencySendAddressWarningSeen() {},
    clearWallets: () => initialState,
  },
});

export const walletsReducer = wallets.reducer;
export const walletsActions = wallets.actions;
