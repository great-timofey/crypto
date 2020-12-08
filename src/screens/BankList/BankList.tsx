import React, { FC, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './BankList.styles';
import { BankItem } from './BankItem/BankItem';
import { BankListType } from './BankList.interface';

import { StatusBar } from '$components';
import { WalletNavbar } from '$screens/Wallet/WalletNavbar/WalletNavbar';
import messages from '$i18n/shared/currencies.messages';
import { walletsActions } from '$redux/wallets';
import {
  refillBanksLoadingSelector,
  refillBanksSelector,
  withdrawBanksLoadingSelector,
  withdrawBanksSelector,
} from '$redux/selectors';
import { MainScreensNames } from '$navigation/names';
import { Bank } from '$redux/wallets/interface';
import {
  BankListNavigationProp,
  BankListScreenRouteProp,
} from '$navigation/main/MainNavigator.interface';

export interface BankListProps {
  navigation: BankListNavigationProp;
  route: BankListScreenRouteProp;
}

export const BankList: FC<BankListProps> = ({
  navigation,
  route: {
    params: { type, resetToRoot },
  },
}) => {
  const dispatch = useDispatch();

  const isRefill = type === BankListType.refill;

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 300);
  }, []);

  useEffect(() => {
    dispatch(
      isRefill ? walletsActions.loadRefillBanks() : walletsActions.loadWithdrawBanks(),
    );
  }, [dispatch, isRefill]);

  const banks = useSelector<any>(
    isRefill ? refillBanksSelector : withdrawBanksSelector,
  ) as Bank[];

  const banksLoading = useSelector(
    isRefill ? refillBanksLoadingSelector : withdrawBanksLoadingSelector,
  );

  const onBankPress = (bankCode: string) => () => {
    dispatch(
      isRefill
        ? walletsActions.setRefillBankCode(bankCode)
        : walletsActions.setWithdrawBankCode(bankCode),
    );
    navigation.navigate(
      isRefill ? MainScreensNames.BankMethodList : MainScreensNames.FiatWithdrawRecipient,
    );
  };

  const handleGoToRootLevel = () => {
    isRefill
      ? dispatch(walletsActions.setRefillAmount(''))
      : dispatch(walletsActions.setWithdrawAmount(''));
    navigation.pop(2);
  };

  return (
    <S.ScreenWrapperStyled>
      <StatusBar barStyle="dark-content" />
      <WalletNavbar onCloseButtonPress={resetToRoot ? handleGoToRootLevel : undefined}>
        <FormattedMessage {...messages.chooseBank} />
      </WalletNavbar>
      {banksLoading || showLoader ? (
        <S.ActivityIndicatorStyled />
      ) : (
        <S.ScrollViewStyled>
          {banks.map((bank) => (
            <BankItem key={bank.code} code={bank.code} onPress={onBankPress(bank.code)} />
          ))}
        </S.ScrollViewStyled>
      )}
    </S.ScreenWrapperStyled>
  );
};
