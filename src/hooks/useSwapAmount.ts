import { useSelector } from 'react-redux';

import { CurrencyType } from '$global/types';
import {
  currencySelector,
  overallAvailableSelector,
  swapSelector,
} from '$redux/selectors';

export const useSwapAmount = () => {
  let overallAvailableCurrentCurrency: number;
  const {
    amount: amountString,
    amountType,
    rate,
    fromCurrency,
    toCurrency,
  } = useSelector(swapSelector);
  const amount = parseFloat(amountString);
  const currencyFromInfo = useSelector(currencySelector(fromCurrency));
  const currencyToInfo = useSelector(currencySelector(toCurrency));
  const overallAvailable = useSelector(overallAvailableSelector(currencyFromInfo.abbr));
  const swap = currencyFromInfo.type !== amountType;
  const action = swap ? 'reverse' : 'slice';

  const [currentCurrencyInfo, secondaryCurrencyInfo] = [currencyFromInfo, currencyToInfo][
    action
  ]();

  const secondaryAmount =
    amountType === CurrencyType.crypto ? amount * rate : amount / rate;

  const [giveAmount, receiveAmount] = [amount, secondaryAmount][action]();

  if (swap) {
    overallAvailableCurrentCurrency =
      currencyFromInfo.type === CurrencyType.fiat
        ? overallAvailable / rate
        : overallAvailable * rate;
  } else {
    overallAvailableCurrentCurrency = overallAvailable;
  }

  return {
    amountType,
    amount,
    currencyFromInfo,
    currencyToInfo,
    giveAmount,
    overallAvailable,
    secondaryAmount,
    currentCurrencyInfo,
    secondaryCurrencyInfo,
    overallAvailableCurrentCurrency,
    receiveAmount,
  };
};
