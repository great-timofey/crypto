import { useSelector } from 'react-redux';

import { currencySelector } from '$redux/selectors';
import { Currency } from '$global/types';

export function useAmountInCurrency(amount: number, currency: Currency) {
  const currencyInfo = useSelector(currencySelector(currency));
  parseFloat(amount.toFixed(currencyInfo?.maximumFractionDigits || 8));
}
