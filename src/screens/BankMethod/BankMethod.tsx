import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import * as S from './BankMethod.styles';
import { Step } from './Step/Step';

import { BankLogo, StatusBar } from '$components';
import { WalletNavbar } from '$screens/Wallet/WalletNavbar/WalletNavbar';
import { refillBankCodeSelector, refillBankSelector } from '$redux/selectors';

export const BankMethod: FC<{ route: any }> = ({ route }) => {
  const bankCode = useSelector(refillBankCodeSelector);
  const { methodId } = route.params;
  const bank = useSelector(refillBankSelector(bankCode));
  const { bottom } = useSafeArea();
  if (!bank) return null;

  return (
    <S.BankMethodScreenStyled>
      <StatusBar />
      <WalletNavbar>{bank.methods[methodId].name}</WalletNavbar>

      <S.BankMethodContentStyled>
        <BankLogo code={bankCode} />
        <View style={{ marginBottom: bottom + 16 }}>
          {bank.methods[methodId].steps.map((step, id) => (
            <Step
              key={step}
              number={id + 1}
              content={step}
              accountNumber={bank.accountNumber}
              serviceProviderCode={bank?.serviceProviderCode}
            />
          ))}
        </View>
      </S.BankMethodContentStyled>
    </S.BankMethodScreenStyled>
  );
};
