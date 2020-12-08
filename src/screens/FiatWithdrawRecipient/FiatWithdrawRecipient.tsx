import React, { FC, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';

import { WalletNavbar } from '../Wallet/WalletNavbar/WalletNavbar';

import * as S from './FiatWithdrawRecipient.styles';

import { isIOS } from '$global/device';
import { BankLogo, StatusBar } from '$components';
import {
  withdrawBankCodeSelector,
  withdrawBankSelector,
  withdrawSelector,
} from '$redux/selectors';
import messages from '$i18n/shared/currencies.messages';
import { walletsActions } from '$redux/wallets/index';
import { MainScreensNames } from '$navigation/names';
import { REGEXES } from '$global/constants';
import { displayToastError } from '$redux/common/actions';

export const FiatWithdrawRecipient: FC<{ navigation: any }> = ({ navigation }) => {
  const { bottom } = useSafeArea();
  const intl = useIntl();
  const inputAccountNumberRef = useRef<TextInput>(null);
  const withdraw = useSelector(withdrawSelector);
  const bankCode = useSelector(withdrawBankCodeSelector);
  const bank = useSelector(withdrawBankSelector(bankCode));
  const dispatch = useDispatch();

  const handleChangeAccountNumber = (number: string) => {
    dispatch(walletsActions.setWithdrawAccountNumber(number));
  };

  const handleChangeAccountHolderName = (name: string) => {
    dispatch(walletsActions.setWithdrawAccountHolderName(name));
  };

  useEffect(() => {
    setTimeout(() => {
      inputAccountNumberRef.current?.focus();
    }, 0);
  }, [inputAccountNumberRef]);

  const handleNext = useCallback(() => {
    if (!REGEXES.accountNumber.test(withdraw.accountNumber)) {
      dispatch(displayToastError(intl.formatMessage(messages.accountNumberIncorrectly)));
      return;
    }
    if (!REGEXES.accountHolderName.test(withdraw.accountHolderName)) {
      dispatch(
        displayToastError(intl.formatMessage(messages.accountHolderNameIncorrectly)),
      );
      return;
    }
    // TODO: Добавить проверку значений инпутов
    navigation?.navigate(MainScreensNames.FiatWithdrawConfirm);
  }, [dispatch, intl, withdraw, navigation]);

  if (withdraw.methodsLoading || !bank) {
    return <S.ActivityIndicatorStyled />;
  }

  return (
    <S.ScreenWrapperStyled style={{ marginBottom: bottom }}>
      <S.KeyboardAvoidingViewStyled behavior={isIOS ? 'padding' : 'height'}>
        <StatusBar barStyle="dark-content" />
        <WalletNavbar>
          {bank.name} <FormattedMessage {...messages.withdrawal} />
        </WalletNavbar>
        <S.FiatWithdrawRecipientContainerStyled>
          <BankLogo code={bank.code} />

          <S.InputStyled
            ref={inputAccountNumberRef}
            value={withdraw.accountNumber}
            label={<FormattedMessage {...messages.accountNumber} />}
            onChangeText={handleChangeAccountNumber}
            inputProps={{ keyboardType: 'numeric' }}
          />

          <S.InputStyled
            value={withdraw.accountHolderName}
            label={<FormattedMessage {...messages.accountHolderName} />}
            onChangeText={handleChangeAccountHolderName}
          />
        </S.FiatWithdrawRecipientContainerStyled>
        <S.FiatWithdrawRecipientButtonNextWrapperStyled>
          <S.ButtonStyled
            title={<FormattedMessage {...messages.next} />}
            onPress={handleNext}
          />
        </S.FiatWithdrawRecipientButtonNextWrapperStyled>
      </S.KeyboardAvoidingViewStyled>
    </S.ScreenWrapperStyled>
  );
};
