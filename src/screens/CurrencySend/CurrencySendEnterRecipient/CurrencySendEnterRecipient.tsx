import React, { FC, useCallback, useEffect, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { TextInput, TextInputProps } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { DESIGN_DEVICE_HEIGHT_WITHOUT_TRANSFER_TIP } from '../constants';

import { CurrencySendEnterRecipientProps } from './CurrencySendEnterRecipient.interface';
import * as S from './CurrencySendEnterRecipient.styles';

import { Input } from '$components';
import { SLIDE_ANIMATION_DURATION } from '$global/constants';
import { isAndroid, DEVICE_HEIGHT } from '$global/device';
import messages from '$i18n/shared/currencies.messages';
import { currencySelector, walletsSelector } from '$redux/selectors';
import { AppDispatch } from '$redux/store';
import { walletsActions } from '$redux/wallets';
import { WalletsState, WalletOperationEnum } from '$redux/wallets/interface';

export const CurrencySendEnterRecipient: FC<CurrencySendEnterRecipientProps> = ({
  onNextPress,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const intl = useIntl();
  const isFocused = useIsFocused();
  const {
    send: { login, address, type },
    wallet: { currency },
  } = useSelector(walletsSelector);

  const currencyInfo = useSelector(currencySelector(currency));
  const inputAddressRef = useRef<TextInput>(null);
  const inputLoginRef = useRef<TextInput>(null);

  const handleRecipientLoginChange = (e: string) => {
    dispatch(walletsActions.setSendLogin(e));
  };

  const handleRecipientAddressChange = (e: string) => {
    dispatch(walletsActions.setSendAddress(e));
  };

  const handleTabChange = (e: WalletsState['send']['type']) => {
    dispatch(walletsActions.setSendType(e));
  };

  const handleFocusField = useCallback(() => {
    if (isFocused) {
      if (type === WalletOperationEnum.transaction) {
        inputAddressRef.current?.focus();
      } else {
        inputLoginRef.current?.focus();
      }
    }
  }, [type, isFocused]);

  useEffect(() => {
    setTimeout(handleFocusField, SLIDE_ANIMATION_DURATION * 1.5);
    //  eslint-disable-next-line
  }, []);

  useEffect(handleFocusField, [handleFocusField]);

  const inputProps: TextInputProps = {
    autoCapitalize: 'none',
    blurOnSubmit: false,
    autoCorrect: false,
    onSubmitEditing: onNextPress,
    returnKeyType: 'next',
    enablesReturnKeyAutomatically: true,
    ...(isAndroid && { keyboardType: 'visible-password' }),
  };

  return (
    <S.CurrencySendEnterRecipientContainerStyled
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 20,
      }}
    >
      <S.CurrencySendStepTitleStyled type="HeadingsSB4">
        <FormattedMessage
          {...messages.sendCurrency}
          values={{ currency: currencyInfo.name }}
        />
      </S.CurrencySendStepTitleStyled>
      <S.TabsStyled
        activeTab={type}
        onChange={handleTabChange}
        tabs={[
          { name: WalletOperationEnum.transfer, title: 'Narfex' },
          {
            name: WalletOperationEnum.transaction,
            title: <FormattedMessage key="0" {...messages.blockchain} />,
          },
        ]}
      />
      <S.TabContainerStyled
        style={{
          opacity: type === WalletOperationEnum.transfer ? 1 : 0,
          height: type === WalletOperationEnum.transfer ? '100%' : 0,
        }}
      >
        {DEVICE_HEIGHT > DESIGN_DEVICE_HEIGHT_WITHOUT_TRANSFER_TIP && (
          <S.CurrencySendEnterRecipientStyled type="HeadingsSB6">
            <FormattedMessage
              {...messages.transferCurrencyWithoutFee}
              values={{ currency: currencyInfo.name }}
            />
          </S.CurrencySendEnterRecipientStyled>
        )}
        <S.CurrencySendInputStyled
          label={intl.formatMessage(messages.transferRecipient)}
          style={{
            opacity: type === WalletOperationEnum.transfer ? 1 : 0,
          }}
          inputProps={{ ...inputProps }}
          ref={inputLoginRef}
          value={login}
          onChangeText={handleRecipientLoginChange}
          description={
            <FormattedMessage
              {...messages.enterNarfexUserLoginForCurrencySend}
              values={{ currency: currencyInfo.name }}
            />
          }
        />
      </S.TabContainerStyled>
      <S.TabContainerStyled
        style={{
          opacity: type === WalletOperationEnum.transaction ? 1 : 0,
          height: type === WalletOperationEnum.transaction ? '100%' : 0,
        }}
      >
        <Input
          label={intl.formatMessage(messages.recipientAddress)}
          value={address}
          ref={inputAddressRef}
          style={{
            opacity: type === WalletOperationEnum.transaction ? 1 : 0,
          }}
          inputProps={inputProps}
          onChangeText={handleRecipientAddressChange}
          description={<FormattedMessage {...messages.enterAddressOfRecipient} />}
        />
      </S.TabContainerStyled>
    </S.CurrencySendEnterRecipientContainerStyled>
  );
};
