import React, { FC } from 'react';
import { Text } from 'react-native';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useSafeArea } from 'react-native-safe-area-context';
import { useClipboard } from '@react-native-community/hooks';

import * as S from './BankMethodsList.styles';

import { BankLogo, ListItem, StatusBar } from '$components';
import { WalletNavbar } from '$screens/Wallet/WalletNavbar/WalletNavbar';
import messages from '$i18n/shared/currencies.messages';
import { refillBankCodeSelector, refillBankSelector } from '$redux/selectors';
import { BOTTOM_TAB_BAR_HEIGHT } from '$global/constants';
import { displayToastSuccess } from '$redux/common/actions';
import { MainScreensNames } from '$navigation/names';

export const BankMethodList: FC<{ navigation: any }> = ({ navigation }) => {
  const theme = useTheme();
  const { bottom } = useSafeArea();
  const bankCode = useSelector(refillBankCodeSelector);
  const bank = useSelector(refillBankSelector(bankCode));
  const intl = useIntl();
  const [, setClipboardText] = useClipboard();
  const dispatch = useDispatch();

  if (!bank) return null;

  const handleCopyAccountNumber = () => {
    setClipboardText(bank.accountNumber);
    dispatch(
      displayToastSuccess(intl.formatMessage(messages.accountNumberCopiedToClipboard)),
    );
  };

  return (
    <S.BankMethodListScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <WalletNavbar>
        <FormattedMessage
          {...messages.bankDeposit}
          values={{
            bank: bank.name,
          }}
        />
      </WalletNavbar>
      <S.BankMethodListContentStyled>
        <BankLogo code={bankCode} />
        <ListItem
          type="list-2"
          icon="copy"
          onPress={handleCopyAccountNumber}
          iconFill={theme.colors.foregroundBlue}
          label={<FormattedMessage {...messages.virtualAccountNumber} />}
          info={
            <Text style={{ color: theme.colors.foregroundBlue }}>
              {bank.accountNumber}
            </Text>
          }
        />

        <ListItem
          type="list-2"
          label={<FormattedMessage {...messages.virtualAccountName} />}
          info="G Fin Tech"
        />

        <S.BankMethodListDividerStyled />

        <S.BankMethodListListStyled
          style={{ marginBottom: bottom + BOTTOM_TAB_BAR_HEIGHT + 16 }}
        >
          {bank.methods.map((method, methodId) => (
            <ListItem
              key={method.name}
              onPress={() => {
                navigation?.navigate(MainScreensNames.BankMethod, { bankCode, methodId });
              }}
              type="list-3"
              icon="angle-right-small"
              label={method.name}
              info={
                <Text style={{ color: theme.colors.foregroundBlue }}>
                  8808179358760947
                </Text>
              }
            />
          ))}
        </S.BankMethodListListStyled>
      </S.BankMethodListContentStyled>
    </S.BankMethodListScreenWrapper>
  );
};
