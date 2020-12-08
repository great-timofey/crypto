import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';

import { WalletCellProps } from './WalletCell.interface';
import * as S from './WalletCell.styles';

import { Coin, Icon, LocalizedCurrency, Typography, UnifiedNumber } from '$components';
import { CurrencyType } from '$global/types';
import { upperFirst } from '$global/utils';
import { currencySelector } from '$redux/selectors';

export const WalletCell: FC<WalletCellProps> = memo(({ currency, amount, onPress }) => {
  const currencyInfo = useSelector(currencySelector(currency));

  if (!currencyInfo) {
    return <></>;
  }

  const { abbr, name, type } = currencyInfo;

  return (
    <S.WalletCellStyled
      iconRight={<Icon name="angle-right-small" />}
      onPress={onPress}
      caption={<Coin currency={abbr} />}
    >
      <Typography type="HeadingsR6">
        <LocalizedCurrency type={type} abbr={abbr} cryptoName={upperFirst(name)} />
      </Typography>
      <Typography type="HeadingsSB6">
        <UnifiedNumber
          value={amount}
          {...(type === CurrencyType.fiat
            ? { fractionDigits: 2 }
            : { maximumFractionDigits: 8 })}
        />{' '}
        {abbr.toUpperCase()}
      </Typography>
    </S.WalletCellStyled>
  );
});
