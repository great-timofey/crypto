import React, { FC } from 'react';
import { useSafeArea } from 'react-native-safe-area-context';
import { FormattedMessage } from 'react-intl';
import { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import messages from '../Swap/Swap.messages';

import * as S from './SwapRate.styles';

import {
  Button,
  CurrencyPair,
  Icon,
  Navbar,
  StatusBar,
  UnifiedNumber,
} from '$components';
import {
  InfoCell,
  InfoCellContent,
  InfoCellFooter,
  InfoCellHeading,
} from '$components/InfoCell';
import { addHitSlop } from '$global/utils';
import { SwapRateNavigationProp } from '$navigation/main/MainNavigator.interface';
import { swapSelector } from '$redux/selectors';
import { swapActions } from '$redux/swap';
import { useSwapAmount } from '$hooks';

export interface SwapRateProps {
  navigation: SwapRateNavigationProp;
}

export const SwapRate: FC<SwapRateProps> = ({ navigation }) => {
  const theme = useTheme();
  const { bottom } = useSafeArea();
  const dispatch = useDispatch();
  const swap = useSelector(swapSelector);

  const { giveAmount, receiveAmount, currencyFromInfo, currencyToInfo } = useSwapAmount();

  const handlePressSwap = () => {
    dispatch(swapActions.exchange());
  };

  return (
    <S.SwapRateContainerStyled style={{ paddingBottom: bottom }}>
      <StatusBar />
      <Navbar
        leftContent={
          <Button
            appearance="icon"
            onPress={() => navigation.goBack()}
            touchableProps={{ ...addHitSlop([20]) }}
            style={{ paddingRight: 32 }}
          >
            <Icon name="angle-left" fill={theme.colors.primaryBlue} />
          </Button>
        }
      >
        <FormattedMessage {...messages.currencySwap} />
      </Navbar>
      <CurrencyPair from={currencyFromInfo.abbr} to={currencyToInfo.abbr} />
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.receive} />
        </InfoCellHeading>
        <InfoCellContent style={{ color: theme.colors.success2 }} bold>
          + <UnifiedNumber value={receiveAmount} currency={currencyToInfo.abbr} />
        </InfoCellContent>
        <InfoCellFooter>
          <UnifiedNumber value={1} currency={currencyToInfo.abbr} />{' '}
          <UnifiedNumber roughly value={swap.rate} currency={currencyFromInfo.abbr} />
        </InfoCellFooter>
      </InfoCell>
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.give} />
        </InfoCellHeading>
        <InfoCellContent bold>
          <UnifiedNumber value={giveAmount} currency={currencyFromInfo.abbr} />
        </InfoCellContent>
        <InfoCellFooter>
          <UnifiedNumber value={1} currency={currencyFromInfo.abbr} />{' '}
          <UnifiedNumber roughly value={1 / swap.rate} currency={currencyToInfo.abbr} />
        </InfoCellFooter>
      </InfoCell>
      <S.SwapButtonStyled
        onPress={handlePressSwap}
        title={
          <FormattedMessage
            {...messages.swapTo}
            values={{
              swapAmount: (
                <UnifiedNumber value={receiveAmount} currency={currencyToInfo.abbr} />
              ),
            }}
          />
        }
      />
    </S.SwapRateContainerStyled>
  );
};
