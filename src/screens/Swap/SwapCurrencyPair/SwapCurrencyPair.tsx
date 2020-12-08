import React, { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import messages from '../Swap.messages';

import * as S from './SwapCurrencyPair.styles';

import { Icon, LocalizedCurrency, Typography } from '$components';
import { Currency } from '$global/types';
import { currencySelector } from '$redux/selectors';

export interface SwapCurrencyPairProps {
  style?: ViewStyle;
  give: Currency;
  receive: Currency;
  onPress: () => void;
}

export const SwapCurrencyPair: FC<SwapCurrencyPairProps> = memo(
  ({ style, give, receive, onPress }) => {
    const theme = useTheme();
    const giveCurrency = useSelector(currencySelector(give));
    const receiveCurrency = useSelector(currencySelector(receive));

    return (
      <S.SwapCurrencyPairContainerStyled onPress={onPress} style={style}>
        <S.PairContainerStyled>
          <S.PairItemStyled size={32} currency={give} />
          <S.PairItemStyled size={32} currency={receive} style={{ marginLeft: -16 }} />
        </S.PairContainerStyled>
        <S.PairNameContainerStyled>
          <Typography type="BodySmallText">
            <FormattedMessage {...messages.give} />{' '}
            <LocalizedCurrency
              abbr={giveCurrency.abbr}
              type={giveCurrency.type}
              cryptoName={giveCurrency.name}
            />
          </Typography>
          <Typography type="BodyAccent">
            <FormattedMessage {...messages.receive} />{' '}
            <LocalizedCurrency
              abbr={receiveCurrency.abbr}
              type={receiveCurrency.type}
              cryptoName={receiveCurrency.name}
            />
          </Typography>
        </S.PairNameContainerStyled>
        <Icon fill={theme.colors.foregroundQuaternary} name="arrows-angle-two-side" />
      </S.SwapCurrencyPairContainerStyled>
    );
  },
);
