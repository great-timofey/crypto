import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import * as S from './SwapCurrencyTab.styles';

import { Coin, LocalizedCurrency } from '$components';
import { Currency } from '$global/types';
import { currencySelector } from '$redux/selectors';

export interface SwapCurrencyTabProps {
  title: ReactNode;
  onPress: () => void;
  currency: Currency;
  active: boolean;
}

export const SwapCurrencyTab: FC<SwapCurrencyTabProps> = ({
  title,
  currency,
  active,
  onPress,
}) => {
  const { type, abbr, name } = useSelector(currencySelector(currency));

  return (
    <S.SwapCurrencyTabStyled onPress={onPress}>
      <S.IconContaier>
        <Coin size={32} currency={currency} />
      </S.IconContaier>
      <S.SwapCurrencyNameContainerStyled>
        <S.SwapCurrencyNameTitleStyled
          active={active}
          textProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
          type="HeadingsSB6"
        >
          {title}
        </S.SwapCurrencyNameTitleStyled>
        <S.SwapCurrencyNameSubtitleStyled
          active={active}
          type="BodySmallText"
          textProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
        >
          <LocalizedCurrency type={type} abbr={abbr} cryptoName={name} />
        </S.SwapCurrencyNameSubtitleStyled>
      </S.SwapCurrencyNameContainerStyled>
      {active && <S.SwapCurrencyTabActiveIndicatorStyled />}
    </S.SwapCurrencyTabStyled>
  );
};
