import React, { FC } from 'react';
import { useTheme } from 'styled-components';

import { Coin } from '../Coin/Coin';

import * as S from './CurrencyPair.styles';
import { CurrencyPairProps } from './CurrencyPair.interface';

export const CurrencyPair: FC<CurrencyPairProps> = ({ from, to }) => {
  const theme = useTheme();
  return (
    <S.CurrencyPairContainerStyled>
      <Coin currency={from} size={64} />
      <S.CurrencyPairIconStyled name="arrow-right" fill={theme.colors.primaryBlue} />
      <Coin currency={to} size={64} />
    </S.CurrencyPairContainerStyled>
  );
};
