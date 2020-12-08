import React, { FC, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { TextInput, TextInputProps } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CurrencySendEnterAmountProps } from './CurrencySendEnterAmount.interface';
import * as S from './CurrencySendEnterAmount.styles';

import {
  COMMA_CHARACTER,
  DEFAULT_SCREEN_PADDING,
  DOT_CHARACTER,
} from '$global/constants';
import { CurrencyType } from '$global/types';
import { Typography, UnifiedNumber } from '$components';
import messages from '$i18n/shared/currencies.messages';
import { currencySelector, walletsSelector } from '$redux/selectors';
import { AppDispatch } from '$redux/store';
import { walletsActions } from '$redux/wallets';
import { validateSendValue } from '$global/currencies/validation';
import { WalletOperationEnum } from '$redux/wallets/interface';

export const CurrencySendEnterAmount: FC<CurrencySendEnterAmountProps> = ({
  onNextPress,
}) => {
  const intl = useIntl();
  const inputUsdRef = useRef<TextInput>(null);
  const inputCurrencyRef = useRef<TextInput>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {
    wallet: {
      currency,
      amount: currencyAmount,
      toUsd: currencyToUsd,
      sendLimit: { fee },
    },
    send: { amountUsd, amount, type },
  } = useSelector(walletsSelector);
  const [inputInProgress, setInputInProgress] = useState(false);

  const currencyInfo = useSelector(currencySelector(currency));
  const currencyUsdInfo = useSelector(currencySelector('usd'));

  useEffect(() => {
    inputCurrencyRef.current?.focus();
  }, []);

  const handleBlur = () => {
    dispatch(walletsActions.setSendAmountUsd((parseFloat(amountUsd) || 0).toString()));
    dispatch(walletsActions.setSendAmount((parseFloat(amount) || 0).toString()));
    setInputInProgress(false);
  };

  const handleAmountCurrencyChange = (value: string) => {
    if (!validateSendValue(value, CurrencyType.crypto)) return;

    const amountCurrencySeparated = value.replace(COMMA_CHARACTER, DOT_CHARACTER);
    const newAmountCurrencyFloat = parseFloat(amountCurrencySeparated);

    if (!Number.isNaN(newAmountCurrencyFloat)) {
      setInputInProgress(true);
      const newAmountUsdFloat = parseFloat(
        (currencyInfo.toUsd * newAmountCurrencyFloat).toFixed(
          currencyUsdInfo.maximumFractionDigits,
        ),
      );
      dispatch(walletsActions.setSendAmountUsd(newAmountUsdFloat.toString()));
    } else {
      dispatch(walletsActions.setSendAmountUsd(''));
    }

    dispatch(walletsActions.setSendAmount(amountCurrencySeparated));
  };

  const handleAmountUsdChange = (value: string) => {
    if (!validateSendValue(value, CurrencyType.fiat)) return;

    const usdAmountSeparated = value.replace(COMMA_CHARACTER, DOT_CHARACTER);
    const newAmountUsdFloat = parseFloat(usdAmountSeparated);

    if (!Number.isNaN(newAmountUsdFloat)) {
      setInputInProgress(true);
      const newAmountCurrencyFloat = parseFloat(
        (newAmountUsdFloat * (1 / currencyInfo.toUsd)).toFixed(
          currencyInfo.maximumFractionDigits,
        ),
      );
      dispatch(walletsActions.setSendAmount(newAmountCurrencyFloat.toString()));
    } else {
      dispatch(walletsActions.setSendAmount(''));
    }

    dispatch(walletsActions.setSendAmountUsd(usdAmountSeparated));
  };

  const inputProps: TextInputProps = {
    blurOnSubmit: false,
    autoCorrect: false,
    onSubmitEditing: onNextPress,
    returnKeyType: 'next',
    enablesReturnKeyAutomatically: true,
    keyboardType: 'numeric',
  };

  return (
    <S.CurrencySendEnterAmountContainerStyled
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingHorizontal: DEFAULT_SCREEN_PADDING,
        paddingBottom: 20,
      }}
    >
      <S.CurrencySendStepTitleStyled type="HeadingsSB4">
        <FormattedMessage
          {...messages.sendCurrency}
          values={{ currency: currencyInfo.name }}
        />
      </S.CurrencySendStepTitleStyled>
      <S.CurrencySendAmountInputStyled
        label={intl.formatMessage(messages.amount)}
        placeholder={intl.formatMessage(messages.maxAmount, {
          maxAmount: currencyAmount,
        })}
        onBlur={handleBlur}
        labelRight={currencyInfo.abbr.toUpperCase()}
        inputProps={inputProps}
        ref={inputCurrencyRef}
        value={amount === '0' && !inputInProgress ? '' : amount}
        onChangeText={handleAmountCurrencyChange}
      />
      <S.CurrencySendAmountInputStyled
        value={amountUsd === '0' && !inputInProgress ? '' : amountUsd}
        ref={inputUsdRef}
        labelRight="USD"
        onBlur={handleBlur}
        placeholder={intl.formatMessage(messages.maxAmount, { maxAmount: currencyToUsd })}
        inputProps={inputProps}
        onChangeText={handleAmountUsdChange}
        description={
          <FormattedMessage
            {...messages.equalsToUSD}
            values={{
              usdAmount: currencyInfo.toUsd.toFixed(
                currencyUsdInfo.maximumFractionDigits,
              ),
              currency: currencyInfo.abbr.toUpperCase(),
            }}
          />
        }
      />
      {type === WalletOperationEnum.transaction && (
        <Typography type="HeadingsSB6">
          <FormattedMessage
            {...messages.feeInCurrency}
            values={{ fee: <UnifiedNumber value={fee} currency={currency} /> }}
          />
        </Typography>
      )}
    </S.CurrencySendEnterAmountContainerStyled>
  );
};
