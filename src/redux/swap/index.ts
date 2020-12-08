import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SwapState } from './interface';

import { Currency, CurrencyType } from '$global/types';

export const swapReducerName = 'swap';

const initialState: SwapState = {
  rate: 9000,
  rateLoading: false,
  actualRate: false,
  amountType: CurrencyType.fiat,
  fromCurrency: 'usd',
  toCurrency: 'btc',
  amount: '',
};

const swap = createSlice({
  name: swapReducerName,
  initialState,
  reducers: {
    // setAmountType(state, action: PayloadAction<SwapTypeEnum>) {
    //   state.amountType = action.payload;
    // },
    toggleAmountType(state) {
      state.amountType =
        state.amountType === CurrencyType.fiat ? CurrencyType.crypto : CurrencyType.fiat;
      // state.amount = state.amountType === SwapTypeEnum.from ?
      //   ((parseFloat(state.amount) || 0) * state.rate).toString() :
      //   ((parseFloat(state.amount) || 0) / state.rate).toString();
    },
    setFromCurrency(state, action: PayloadAction<Currency>) {
      state.fromCurrency = action.payload;
    },
    setToCurrency(state, action: PayloadAction<Currency>) {
      state.toCurrency = action.payload;
    },
    setActualRate(state, action: PayloadAction<boolean>) {
      state.actualRate = action.payload;
    },
    setAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
    setRateLoading(state, action: PayloadAction<boolean>) {
      state.rateLoading = action.payload;
    },
    loadRate() {},
    startPoolingRate() {},
    stopPoolingRate() {},
    setRate(state, action: PayloadAction<number>) {
      state.rate = action.payload;
    },
    clearState: () => initialState,
    exchange() {},
  },
});

export const swapActions = swap.actions;
export const swapReducer = swap.reducer;
