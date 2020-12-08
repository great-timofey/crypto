import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BalancesState } from './interface';

export const balancesReducerName = 'balances';

const initialState: BalancesState = {
  loading: false,
  refresh: false,
  balances: {
    exchange: 0,
    crypto: 0,
    fiat: 0,
  },
  totalAmount: {
    usd: 0,
    btc: 0,
  },
};

const balances = createSlice({
  name: balancesReducerName,
  initialState,
  reducers: {
    loadBalance() {},
    refreshBalance() {},
    setLoadingBalance(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setRefreshBalance(state, action: PayloadAction<boolean>) {
      state.refresh = action.payload;
    },
    setBalances(
      state,
      action: PayloadAction<{
        balances: BalancesState['balances'];
        totalAmount: BalancesState['totalAmount'];
      }>,
    ) {
      state.balances = action.payload.balances;
      state.totalAmount = action.payload.totalAmount;
      state.loading = false;
    },
    clearBalancesStore: () => initialState,
  },
});

export const balancesReducer = balances.reducer;

export const {
  loadBalance,
  refreshBalance,
  clearBalancesStore,
  setLoadingBalance,
  setBalances,
  setRefreshBalance,
} = balances.actions;
