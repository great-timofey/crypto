import React, { FC, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './CurrencySendSuccess.styles';

import messages from '$i18n/shared/currencies.messages';
import { setGACode } from '$redux/common/actions';
import { MainScreensNames } from '$navigation/names';
import { StatusBar } from '$components';
import { lastWalletHistoryItemSelector } from '$redux/selectors';

export interface CurrencySendSuccessProps {
  navigation?: any;
}

export const CurrencySendSuccess: FC<CurrencySendSuccessProps> = ({ navigation }) => {
  const { bottom } = useSafeArea();
  const dispatch = useDispatch();
  const lastHistoryItem = useSelector(lastWalletHistoryItemSelector);

  const handleBackToWallets = () => {
    dispatch(setGACode(''));
    navigation?.navigate(MainScreensNames.Wallet);
  };

  const handleGoToNotification = useCallback(() => {
    dispatch(setGACode(''));
    navigation?.navigate(MainScreensNames.HistoryItem, { item: lastHistoryItem });
  }, [dispatch, lastHistoryItem, navigation]);

  return (
    <S.CurrencySendSuccessStyled style={{ paddingBottom: bottom }}>
      <StatusBar barStyle="dark-content" />
      <S.CurrencySendSuccessContentStyled>
        <S.SuccessIconStyled name="30" />
        <S.SuccessTextStyled type="HeadingsSB6">
          <FormattedMessage {...messages.transferSent} />
        </S.SuccessTextStyled>
      </S.CurrencySendSuccessContentStyled>
      <S.ButtonContainerStyled>
        <S.ButtonStyled
          appearance="ghost"
          title={<FormattedMessage {...messages.transactionDetails} />}
          //  TODO: add stack reset after transition
          onPress={handleGoToNotification}
        />
        <S.ButtonStyled
          title={<FormattedMessage {...messages.toWallet} />}
          //  TODO: add stack reset after transition
          onPress={handleBackToWallets}
        />
      </S.ButtonContainerStyled>
    </S.CurrencySendSuccessStyled>
  );
};
