import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import messages from '../Swap/Swap.messages';

import * as S from './SwapInsufficientFunds.styles';

import { Button, Icon, Navbar, StatusBar, UnifiedNumber } from '$components';
import { CurrencyType } from '$global/types';
import { addHitSlop } from '$global/utils';
import { useSwapAmount } from '$hooks';
import { SwapInsufficientFundsNavigationProp } from '$navigation/main/MainNavigator.interface';
import { MainScreensNames } from '$navigation/names';
import {
  overallAvailableSelector,
  swapSelector,
  walletsSelector,
} from '$redux/selectors';
import { walletsActions } from '$redux/wallets';

export interface SwapInsufficientFundsProps {
  navigation: SwapInsufficientFundsNavigationProp;
}

export const SwapInsufficientFunds: FC<SwapInsufficientFundsProps> = ({ navigation }) => {
  const theme = useTheme();
  const { bottom } = useSafeArea();

  const dispatch = useDispatch();
  const wallets = useSelector(walletsSelector);
  const swap = useSelector(swapSelector);
  const { giveAmount, receiveAmount, currencyFromInfo, currencyToInfo } = useSwapAmount();

  const overallAvailable = useSelector(overallAvailableSelector(currencyFromInfo.abbr));

  const handleGoToRoot = () => {
    navigation.popToTop();
    navigation.pop();
  };

  const handleNavigateToCryptowallet = (id: number) => () => {
    dispatch(walletsActions.loadWallet(id));
    navigation.navigate(MainScreensNames.CurrencyReceive, { fullScreen: true });
  };

  const renderReplenishButton = () => {
    if (swap.fromCurrency === 'idr') {
      return (
        <Button
          style={{ marginBottom: 8 }}
          onPress={() =>
            //  @ts-ignore
            navigation.navigate(MainScreensNames.BankNavigator, {
              screen: MainScreensNames.BankList,
              params: { resetToRoot: true },
            })
          }
          title={
            <FormattedMessage
              {...messages.replenish}
              values={{ currency: swap.fromCurrency.toUpperCase() }}
            />
          }
        />
      );
    }

    const cryptoWallet = wallets.wallets.find(
      ({ currency }) => currency === currencyFromInfo.abbr,
    );

    if (currencyFromInfo.type === CurrencyType.crypto && cryptoWallet) {
      return (
        <Button
          style={{ marginBottom: 8 }}
          onPress={handleNavigateToCryptowallet(cryptoWallet.id)}
          title={
            <FormattedMessage
              {...messages.receiveCryptocurrency}
              values={{ cryptocurrency: swap.fromCurrency.toUpperCase() }}
            />
          }
        />
      );
    }

    return <></>;
  };

  return (
    <S.SwapInsufficientFundsContainerStyled style={{ paddingBottom: bottom }}>
      <StatusBar barStyle="dark-content" />
      <Navbar
        leftContent={
          <S.NavbarBackButtonStyled
            appearance="icon"
            onPress={navigation.goBack}
            touchableProps={{ ...addHitSlop([40]) }}
          >
            <Icon name="angle-left" fill={theme.colors.primaryBlue} />
          </S.NavbarBackButtonStyled>
        }
        rightContent={
          <S.NavbarCloseButtonStyled
            appearance="icon"
            onPress={handleGoToRoot}
            touchableProps={{ ...addHitSlop([40]) }}
          >
            <Icon name="close-large" fill={theme.colors.primaryBlue} />
          </S.NavbarCloseButtonStyled>
        }
      >
        <FormattedMessage {...messages.insufficientFunds} />
      </Navbar>
      <S.ContentWrapperStyled>
        <S.ContentIconStyled name="40" />
        <S.ContentTextStyled type="HeadingsSB6">
          <FormattedMessage
            {...messages.insufficientFundsDetails}
            values={{
              giveAmount: (
                <UnifiedNumber
                  value={giveAmount - overallAvailable}
                  currency={currencyFromInfo.abbr}
                />
              ),
              receiveAmount: (
                <UnifiedNumber value={receiveAmount} currency={currencyToInfo.abbr} />
              ),
            }}
          />
        </S.ContentTextStyled>
      </S.ContentWrapperStyled>

      {renderReplenishButton()}
    </S.SwapInsufficientFundsContainerStyled>
  );
};
