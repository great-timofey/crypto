import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';

import messages from '../Swap/Swap.messages';

import * as S from './SwapSuccess.styles';

import { MainScreensNames } from '$navigation/names';
import { SwapRateNavigationProp } from '$navigation/main/MainNavigator.interface';
import { StatusBar } from '$components';

export interface SwapSuccessProps {
  navigation: SwapRateNavigationProp;
}

export const SwapSuccess: FC<SwapSuccessProps> = ({ navigation }) => {
  const { bottom } = useSafeArea();

  return (
    <S.SwapSuccessContainerStyled style={{ paddingBottom: bottom }}>
      <StatusBar barStyle="dark-content" />
      <S.SuccessTitleContainerStyled>
        <S.ResultSuccessIconStyled name="38" />
        <S.ResultSuccessTextStyled type="HeadingsSB6">
          <FormattedMessage {...messages.purchaseSuccess} />
        </S.ResultSuccessTextStyled>
      </S.SuccessTitleContainerStyled>
      {/*<S.DetailsButtonStyled*/}
      {/*  appearance="ghost"*/}
      {/*  title={<FormattedMessage {...messages.purchaseDetails} />}*/}
      {/*  onPress={() => navigation.navigate(MainScreensNames.Notifications)}*/}
      {/*/>*/}
      <S.ToWalletButtonStyled
        title={<FormattedMessage {...messages.toWallet} />}
        onPress={() => navigation.navigate(MainScreensNames.Wallets)}
      />
    </S.SwapSuccessContainerStyled>
  );
};
