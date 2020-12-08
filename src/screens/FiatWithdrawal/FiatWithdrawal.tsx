import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { TextInput, TextInputProps } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'styled-components';

import { WalletNavbar } from '../Wallet/WalletNavbar/WalletNavbar';

import * as S from './FiatWithdrawal.styles';

import { darkenStatusBar, lightenStatusBar } from '$global/statusBar';
import { COMMA_CHARACTER, DOT_CHARACTER } from '$global/constants';
import { validateSendValue } from '$global/currencies/validation';
import { CurrencyType } from '$global/types';
import { isIOS } from '$global/device';
import { FiatWithdrawalNavigationProp } from '$navigation/main/MainNavigator.interface';
import { BankListType } from '$screens/BankList/BankList.interface';
import { numberFormat } from '$global/currencies/formatting';
import { Input, StatusBar, UnifiedNumber } from '$components';
import {
  balanceSelector,
  withdrawMethodsSelector,
  withdrawSelector,
} from '$redux/selectors';
import messages from '$i18n/shared/currencies.messages';
import { walletsActions } from '$redux/wallets/index';
import { displayToastError } from '$redux/common/actions';
import { MainScreensNames } from '$navigation/names';

export interface FiatWithdrawalProps {
  navigation: FiatWithdrawalNavigationProp;
}

export const FiatWithdrawal: FC<FiatWithdrawalProps> = ({ navigation }) => {
  const { bottom } = useSafeArea();
  const inputAmountRef = useRef<TextInput>(null);
  const { currency, amount } = useSelector(balanceSelector);
  const withdrawMethods = useSelector(withdrawMethodsSelector);
  const withdraw = useSelector(withdrawSelector);
  const intl = useIntl();
  const dispatch = useDispatch();
  const theme = useTheme();

  const amountInfo = withdrawMethods?.xendit?.currencies?.[currency];
  const minAmount = amountInfo?.minAmount ?? 0;
  const maxAmount = amountInfo?.maxAmount ?? 0;
  const feePercentage = amountInfo?.fees?.percentFee ?? 0;
  const feeMin = amountInfo?.fees?.minFee ? Number(amountInfo.fees.minFee) : 0;

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 300);
  }, []);

  const calculateFee = () => {
    const refillWithoutFee = (+withdraw.amount * feePercentage) / 100;
    return refillWithoutFee < +feeMin ? feeMin : refillWithoutFee;
  };

  const toWithdraw = +withdraw.amount + calculateFee();

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        darkenStatusBar();
        return;
      }

      lightenStatusBar();
    }, [theme]),
  );

  useEffect(() => {
    dispatch(walletsActions.loadWithdrawMethods());
  }, [dispatch]);

  useEffect(() => {
    !withdraw.methodsLoading &&
      setTimeout(() => {
        inputAmountRef.current?.focus();
        //  need some delay for correct focus behavior
      }, 50);
  }, [inputAmountRef, withdraw.methodsLoading]);

  const handleChangeAmount = (value: string) => {
    if (!validateSendValue(value, CurrencyType.fiat)) return;

    const fiatAmountSeparated = value.replace(COMMA_CHARACTER, DOT_CHARACTER);
    const fiatParsed = parseFloat(fiatAmountSeparated);

    dispatch(
      walletsActions.setWithdrawAmount(
        Number.isNaN(fiatParsed) ? '' : fiatAmountSeparated,
      ),
    );
  };

  const handleNextPress = useCallback(() => {
    if (!withdraw.amount || parseFloat(withdraw.amount) < minAmount) {
      dispatch(
        displayToastError(
          intl.formatMessage(messages.minWithdrawAmount, {
            amount: `${numberFormat(minAmount)} ${currency.toUpperCase()}`,
          }),
        ),
      );
    } else if (parseFloat(withdraw.amount) > maxAmount) {
      dispatch(
        displayToastError(
          intl.formatMessage(messages.maxWithdrawAmount, {
            amount: `${numberFormat(maxAmount)} ${currency.toUpperCase()}`,
          }),
        ),
      );
    } else {
      //  TODO: fix types
      //  @ts-ignore
      navigation.navigate(MainScreensNames.BankNavigator, {
        screen: MainScreensNames.BankList,
        params: { type: BankListType.withdraw },
      });
    }
  }, [dispatch, intl, maxAmount, minAmount, currency, withdraw, navigation]);

  const cleanupWithdraw = () => {
    dispatch(walletsActions.setWithdrawAmount(''));
    navigation.goBack();
  };

  if (withdraw.methodsLoading || showLoader) {
    return <S.LoaderStyled />;
  }

  const inputProps: TextInputProps = {
    autoCorrect: false,
    onSubmitEditing: handleNextPress,
    keyboardType: 'numeric',
  };

  return (
    <S.ScreenWrapperStyled style={{ marginBottom: bottom }}>
      <StatusBar />
      <S.KeyboardAvoidingViewStyled behavior={isIOS ? 'padding' : 'height'}>
        <WalletNavbar onBackButtonPress={cleanupWithdraw}>
          <FormattedMessage {...messages.withdraw} />{' '}
          <FormattedMessage {...messages[currency]} />
        </WalletNavbar>
        <S.FiatWithdrawContainerStyled>
          <Input
            ref={inputAmountRef}
            value={withdraw.amount}
            label={<FormattedMessage {...messages.withdrawAmount} />}
            inputProps={inputProps}
            description={
              <FormattedMessage
                {...messages.availableToWithdraw}
                values={{
                  amount: <UnifiedNumber value={amount} currency={currency} />,
                }}
              />
            }
            onChangeText={handleChangeAmount}
            labelRight={currency.toUpperCase()}
          />
          <S.FiatWithdrawFeeStyled type="HeadingsR6">
            {withdraw.amount ? (
              <FormattedMessage
                {...messages.feeInCurrency}
                values={{
                  fee: `${numberFormat(calculateFee())} ${currency.toUpperCase()}`,
                }}
              />
            ) : (
              <FormattedMessage
                {...messages.feePercentageAndMin}
                values={{
                  feeMin: feeMin ? ` ${feeMin} ${currency.toUpperCase()}` : undefined,
                  feePercentage: feePercentage ? `${feePercentage}%,` : undefined,
                }}
              />
            )}
          </S.FiatWithdrawFeeStyled>
          {+withdraw.amount > 0 ? (
            <S.FiatWithdrawResultTitleStyled
              textProps={{
                adjustsFontSizeToFit: true,
                numberOfLines: 1,
              }}
              type="HeadingsR4"
            >
              <FormattedMessage
                {...messages.toWithdraw}
                values={{
                  amount: `${numberFormat(toWithdraw)} ${currency.toUpperCase()}`,
                }}
              />
            </S.FiatWithdrawResultTitleStyled>
          ) : (
            <></>
          )}
          <S.ButtonStyled
            title={<FormattedMessage {...messages.next} />}
            onPress={handleNextPress}
          />
        </S.FiatWithdrawContainerStyled>
      </S.KeyboardAvoidingViewStyled>
    </S.ScreenWrapperStyled>
  );
};
