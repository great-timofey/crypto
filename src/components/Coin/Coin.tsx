import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';

import { CircleIcon } from '../CircleIcon/CircleIcon';

import { CoinProps } from './Coin.interface';

import { currencySelector } from '$redux/selectors';

export const Coin: FC<CoinProps> = memo(({ size = 40, currency, style, loading }) => {
  const currencyData = useSelector(currencySelector(currency));

  return (
    <CircleIcon
      size={size}
      loading={loading}
      style={style}
      source={currencyData?.icon ? { uri: currencyData.icon } : null}
      gradient={currencyData?.gradient}
    />
  );
});
