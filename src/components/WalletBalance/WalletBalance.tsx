import React, { FC } from 'react';

import { UnifiedNumber } from '../UnifiedNumber/UnifiedNumber';

import { WalletBalanceProps } from './WalletBalance.interface';
import * as S from './WalletBalance.style';

export const WalletBalance: FC<WalletBalanceProps> = ({
  title,
  amount,
  currency,
  total,
  style,
}) => {
  const percent: number = (amount / total) * 100;

  return (
    <S.WalletBalanceContainerStyled style={style}>
      <S.WalletBalanceFillStyled style={{ width: `${percent}%` }} />
      <S.WalletBalanceTitleStyled type="BodyAccent">{title}</S.WalletBalanceTitleStyled>
      <S.WalletBalanceAmountStyled type="BodyAccent">
        <UnifiedNumber value={amount} currency={currency} fractionDigits={2} />
      </S.WalletBalanceAmountStyled>
    </S.WalletBalanceContainerStyled>
  );
};
