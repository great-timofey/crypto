import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { FormattedMessage } from 'react-intl';
import { Text } from 'react-native';

import * as S from './FiatWithdrawConfirm.styles';

import { isIOS } from '$global/device';
import { BankLogo, ListItem, StatusBar, UnifiedNumber, Button } from '$components';
import { WalletNavbar } from '$screens/Wallet/WalletNavbar/WalletNavbar';
import { walletsActions } from '$redux/wallets';
import {
  balanceSelector,
  currencySelector,
  withdrawBankCodeSelector,
  withdrawBankSelector,
  withdrawSelector,
} from '$redux/selectors';
import messages from '$i18n/shared/currencies.messages';

export const FiatWithdrawConfirm: FC = () => {
  const bankCode = useSelector(withdrawBankCodeSelector);
  const dispatch = useDispatch();
  const bank = useSelector(withdrawBankSelector(bankCode));
  const balance = useSelector(balanceSelector);
  const currencyInfo = useSelector(currencySelector(balance.currency));
  const withdraw = useSelector(withdrawSelector);
  const fees = withdraw.methods.xendit.currencies[balance.currency]?.fees;
  const { bottom } = useSafeArea();

  if (!fees || !bank) return null;

  const fee = Math.max(
    (parseFloat(withdraw.amount) / 100) * fees.percentFee,
    +fees.minFee,
  );

  const handleWithdraw = () => {
    dispatch(walletsActions.createWithdraw());
  };

  return (
    <S.FiatWithdrawConfirmScreenStyled style={{ marginBottom: bottom }}>
      <S.KeyboardAvoidingViewStyled behavior={isIOS ? 'padding' : 'height'}>
        <StatusBar barStyle="dark-content" />
        <WalletNavbar>
          {bank.name} <FormattedMessage {...messages.withdrawal} />
        </WalletNavbar>
        <S.ScrollViewStyled>
          <BankLogo code={bank.code} />

          <ListItem
            label={<FormattedMessage {...messages.amount} />}
            info={
              <UnifiedNumber
                value={parseFloat(withdraw.amount)}
                currency={balance.currency}
              />
            }
            description={
              <UnifiedNumber
                value={parseFloat(withdraw.amount) / currencyInfo.toUsd}
                currency="usd"
                roughly
              />
            }
          />
          <ListItem
            label={<FormattedMessage {...messages.fee} />}
            type="list-2"
            info={<UnifiedNumber value={fee} currency={balance.currency} />}
          />
          <ListItem
            label={<FormattedMessage {...messages.accountNumber} />}
            type="list-2"
            info={<Text>{withdraw.accountNumber}</Text>}
          />
          <ListItem
            label={<FormattedMessage {...messages.accountHolderName} />}
            type="list-2"
            info={<Text>{withdraw.accountHolderName}</Text>}
          />
        </S.ScrollViewStyled>

        <S.ButtonWrapperStyled>
          <Button
            title={
              <>
                <FormattedMessage {...messages.withdraw} />{' '}
                <UnifiedNumber
                  value={parseFloat(withdraw.amount)}
                  currency={balance.currency}
                />
              </>
            }
            onPress={handleWithdraw}
          />
        </S.ButtonWrapperStyled>
      </S.KeyboardAvoidingViewStyled>
    </S.FiatWithdrawConfirmScreenStyled>
  );
};
