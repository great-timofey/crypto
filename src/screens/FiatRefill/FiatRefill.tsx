import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { TextInput, TextInputProps } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'styled-components';

import { WalletNavbar } from '../Wallet/WalletNavbar/WalletNavbar';

import * as S from './FiatRefill.styles';

import { isIOS } from '$global/device';
import { COMMA_CHARACTER, DOT_CHARACTER } from '$global/constants';
import { validateSendValue } from '$global/currencies/validation';
import { darkenStatusBar, lightenStatusBar } from '$global/statusBar';
import { CurrencyType } from '$global/types';
import { BankListType } from '$screens/BankList/BankList.interface';
import { FiatRefillNavigationProp } from '$navigation/main/MainNavigator.interface';
import { numberFormat } from '$global/currencies/formatting';
import { Input, StatusBar } from '$components';
import { balanceSelector, refillMethodsSelector, refillSelector } from '$redux/selectors';
import messages from '$i18n/shared/currencies.messages';
import { walletsActions } from '$redux/wallets/index';
import { displayToastError } from '$redux/common/actions';
import { MainScreensNames } from '$navigation/names';

export interface FiatRefillProps {
  navigation: FiatRefillNavigationProp;
}

export const FiatRefill: FC<FiatRefillProps> = ({ navigation }) => {
  const { bottom } = useSafeArea();
  const inputAmountRef = useRef<TextInput>(null);
  const { currency } = useSelector(balanceSelector);
  const refillMethods = useSelector(refillMethodsSelector);
  const refill = useSelector(refillSelector);
  const intl = useIntl();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 300);
  }, []);

  const amountInfo = refillMethods?.xendit?.currencies?.[currency];
  const minAmount = amountInfo?.minAmount ?? 0;
  const maxAmount = amountInfo?.maxAmount ?? 0;
  const feePercentage = amountInfo?.fees?.percentFee ?? 0;
  const feeMin = amountInfo?.fees?.minFee ? Number(amountInfo.fees.minFee) : 0;

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
    dispatch(walletsActions.loadRefillMethods());
  }, [dispatch]);

  useEffect(() => {
    !refill.methodsLoading &&
      setTimeout(() => {
        inputAmountRef.current?.focus();
        //  need some delay for correct focus behavior
      }, 50);
  }, [inputAmountRef, refill.methodsLoading]);

  const handleChangeAmount = (value: string) => {
    if (!validateSendValue(value, CurrencyType.fiat)) return;

    const fiatAmountSeparated = value.replace(COMMA_CHARACTER, DOT_CHARACTER);
    const fiatParsed = parseFloat(fiatAmountSeparated);

    dispatch(
      walletsActions.setRefillAmount(Number.isNaN(fiatParsed) ? '' : fiatAmountSeparated),
    );
  };

  const handleNextPress = useCallback(() => {
    if (!refill.amount || parseFloat(refill.amount) < minAmount) {
      dispatch(
        displayToastError(
          intl.formatMessage(messages.minRefillAmount, {
            amount: `${numberFormat(minAmount)} ${currency.toUpperCase()}`,
          }),
        ),
      );
    } else if (parseFloat(refill.amount) > maxAmount) {
      dispatch(
        displayToastError(
          intl.formatMessage(messages.maxRefillAmount, {
            amount: `${numberFormat(maxAmount)} ${currency.toUpperCase()}`,
          }),
        ),
      );
    } else {
      //  TODO: fix types
      //  @ts-ignore
      navigation?.navigate(MainScreensNames.BankNavigator, {
        screen: MainScreensNames.BankList,
        params: { type: BankListType.refill },
      });
    }
  }, [dispatch, navigation, refill.amount, currency, intl, maxAmount, minAmount]);

  const calculateFee = () => {
    const refillWithoutFee = (+refill.amount * feePercentage) / 100;
    return refillWithoutFee < +feeMin ? feeMin : refillWithoutFee;
  };

  const toCredit = +refill.amount - calculateFee();

  const cleanupRefill = () => {
    dispatch(walletsActions.setRefillAmount(''));
    navigation.goBack();
  };

  if (refill.methodsLoading || showLoader) {
    return <S.LoaderStyled />;
  }

  const inputProps: TextInputProps = {
    returnKeyType: 'next',
    keyboardType: 'numeric',
    onSubmitEditing: handleNextPress,
  };

  return (
    <S.ScreenWrapperStyled style={{ marginBottom: bottom }}>
      <StatusBar />
      <S.KeyboardAvoidingViewStyled behavior={isIOS ? 'padding' : 'height'}>
        <WalletNavbar onBackButtonPress={cleanupRefill}>
          <FormattedMessage {...messages.refill} />{' '}
          <FormattedMessage {...messages[currency]} />
        </WalletNavbar>
        <S.FiatRefillContainerStyled>
          <Input
            ref={inputAmountRef}
            value={refill.amount}
            inputProps={inputProps}
            onChangeText={handleChangeAmount}
            labelRight={currency.toUpperCase()}
            label={<FormattedMessage {...messages.refillAmount} />}
          />
          <S.FiatRefillFeeStyled type="HeadingsR6">
            {refill.amount ? (
              <>
                <FormattedMessage
                  {...messages.feeInCurrency}
                  values={{
                    fee: `${numberFormat(calculateFee())} ${currency.toUpperCase()}`,
                  }}
                />
              </>
            ) : (
              <FormattedMessage
                {...messages.feePercentageAndMin}
                values={{
                  feeMin: feeMin ? ` ${feeMin} ${currency.toUpperCase()}` : undefined,
                  feePercentage: feePercentage ? `${feePercentage}%,` : undefined,
                }}
              />
            )}
          </S.FiatRefillFeeStyled>
          {toCredit > 0 ? (
            <S.FiatRefillResultTitleStyled
              textProps={{
                adjustsFontSizeToFit: true,
                numberOfLines: 1,
              }}
              type="HeadingsR4"
            >
              <FormattedMessage
                {...messages.toCredit}
                values={{
                  amount: `${numberFormat(toCredit)} ${currency.toUpperCase()}`,
                }}
              />
            </S.FiatRefillResultTitleStyled>
          ) : (
            <></>
          )}
          <S.ButtonStyled
            title={<FormattedMessage {...messages.next} />}
            onPress={handleNextPress}
          />
        </S.FiatRefillContainerStyled>
      </S.KeyboardAvoidingViewStyled>
    </S.ScreenWrapperStyled>
  );
};
