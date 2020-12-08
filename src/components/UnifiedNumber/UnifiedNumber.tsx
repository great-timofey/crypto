import React, { FC, memo } from 'react';
import { Text } from 'react-native';
import { FormattedNumberParts } from 'react-intl';
import { useSelector } from 'react-redux';

import { renderNumberChar } from '$global/currencies/formatting';
import { Currency } from '$global/types';
import { currencySelector } from '$redux/selectors';

export type UnifiedNumberProps =
  | {
      fractionDigits: number;
      minimumFractionDigits?: undefined;
      maximumFractionDigits?: undefined;
      value: number;
      currency?: Currency;
      plusSign?: boolean;
      roughly?: boolean;
    }
  | {
      fractionDigits?: undefined;
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
      value: number;
      currency?: Currency;
      plusSign?: boolean;
      roughly?: boolean;
    };

export const UnifiedNumber: FC<UnifiedNumberProps> = memo(
  ({
    fractionDigits,
    minimumFractionDigits,
    maximumFractionDigits,
    value: amount,
    roughly = false,
    plusSign = false,
    currency,
  }) => {
    const currencyInfo = useSelector(currencySelector(currency || 'btc'));
    return (
      <Text>
        {roughly && `≈\u00A0`}
        {plusSign && amount > 0 && '+\u00A0'}
        <FormattedNumberParts
          value={amount}
          style="decimal"
          {...(fractionDigits && fractionDigits > 0
            ? {
                minimumFractionDigits: fractionDigits,
                maximumFractionDigits: fractionDigits,
              }
            : {
                minimumFractionDigits,
                maximumFractionDigits: currency
                  ? currencyInfo.maximumFractionDigits
                  : maximumFractionDigits,
              })}
        >
          {(parts) => (
            <>{parts.map(({ type, value }) => renderNumberChar(type, value))}</>
          )}
        </FormattedNumberParts>
        {currency && `\u00A0${currency.toUpperCase()}`}
      </Text>
    );
  },
);
