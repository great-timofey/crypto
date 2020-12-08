import { Currency, CurrencyType } from '$global/types';

export interface SwapState {
  rate: number;
  rateLoading: boolean;
  actualRate: boolean;
  amountType: CurrencyType;
  fromCurrency: Currency;
  toCurrency: Currency;
  amount: string;
}
