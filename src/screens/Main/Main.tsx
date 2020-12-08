import React, { useCallback, useState, useEffect, FC, useRef } from 'react';
import { useBackHandler } from '@react-native-community/hooks';
import { FormattedMessage, FormattedNumberParts, useIntl } from 'react-intl';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import { useTheme } from 'styled-components';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBarStyle, ScrollView, RefreshControl } from 'react-native';

import * as S from './Main.styles';

import { showAlert } from '$global/utils';
import settingsMessages from '$i18n/shared/Settings.messages';
import shortMessages from '$i18n/shared/short.messages';
import { profileActions } from '$redux/profile';
import { renderNumberChar } from '$global/currencies/formatting';
import { loadBalance, refreshBalance } from '$redux/balances';
import {
  balancesSelector,
  notificationsCountSelector,
  walletsSelector,
} from '$redux/selectors';
import messages from '$i18n/shared/Main.messages';
import { BottomSheetStatic, StatusBar, UnifiedNumber } from '$components';
import { MainScreensNames } from '$navigation/names';
import { MainScreenNavigationProp } from '$navigation/main/MainNavigator.interface';
import { lightenStatusBar, darkenStatusBar } from '$global/statusBar';
import { loadUnreadCountRequest } from '$redux/notifications';
import { walletsActions } from '$redux/wallets';
import { openExternalUrl } from '$redux/common/actions';
import { BUY_TOKEN_URL } from '$global/siteUrls';

type MainProps = {
  navigation: MainScreenNavigationProp;
};

export const Main: FC<MainProps> = ({ navigation }) => {
  const [balancesHeight, setBalancesHeight] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const theme = useTheme();
  const [bottomSheetOpened, setBottomSheetOpened] = useState(false);
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheetBehavior>(null);
  const { loading, refresh, balances, totalAmount } = useSelector(balancesSelector);
  const { balances: walletBalances } = useSelector(walletsSelector);
  const unreadCount = useSelector(notificationsCountSelector);
  const intl = useIntl();
  const mainScreenFocused = useIsFocused();

  const handlePressRefill = () => {
    const idrBalance = walletBalances.find((b) => b.currency === 'idr');
    idrBalance && dispatch(walletsActions.choiceBalance(idrBalance.id));
    //  TODO: fix types
    //  @ts-ignore
    navigation.navigate(MainScreensNames.WalletsNavigator, {
      screen: MainScreensNames.FiatRefill,
    });
  };

  useEffect(() => {
    dispatch(loadBalance());
    dispatch(loadUnreadCountRequest());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(refreshBalance());
  }, [dispatch]);

  useBackHandler(() => {
    if (mainScreenFocused) {
      handleExit();
      return true;
    }

    return false;
  });

  const handleExit = () => {
    showAlert({
      title: intl.formatMessage(settingsMessages.exitConfirm),
      rightText: intl.formatMessage(shortMessages.yes),
      rightOnPress: () => dispatch(profileActions.requestSignOut()),
      leftText: intl.formatMessage(shortMessages.no),
      leftOnPress: () => {
        if (theme.isCurrent('light')) {
          bottomSheetOpened ? darkenStatusBar() : lightenStatusBar();
        }
      },
    });
  };

  const handleBalancesLayout = useCallback(
    (event) => {
      setBalancesHeight(event.nativeEvent.layout.height);
    },
    [setBalancesHeight],
  );

  const handleScreenLayout = useCallback(
    (event) => {
      setScreenHeight(event.nativeEvent.layout.height);
    },
    [setScreenHeight],
  );

  const bottomSheetSnapStart = screenHeight - balancesHeight;

  const getStatusBarBarStyle: () => StatusBarStyle = () => {
    if (theme.isCurrent('light') && bottomSheetOpened) {
      return 'dark-content';
    }

    return 'light-content';
  };

  useEffect(() => {
    if (theme.isCurrent('light') && bottomSheetOpened) {
      darkenStatusBar();
    } else {
      lightenStatusBar();
    }
  }, [theme, bottomSheetOpened]);

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        lightenStatusBar();
      }

      return () => {
        bottomSheetRef.current?.snapTo(0);
        setBottomSheetOpened(false);

        setTimeout(() => {
          if (theme.isCurrent('light')) {
            darkenStatusBar();
          }
        }, 50);
      };
    }, [theme]),
  );

  return (
    <S.MainWrapper>
      <StatusBar ignoreTheme barStyle={getStatusBarBarStyle()} />
      {!loading ? (
        <ScrollView
          onLayout={handleScreenLayout}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.white}
              refreshing={refresh}
              onRefresh={handleRefresh}
            />
          }
        >
          <S.MainContainerStyled onLayout={handleBalancesLayout}>
            <S.NotificationBadgeButtonStyled
              badgeContent={unreadCount}
              iconName="bell"
              iconFill={theme.colors.white}
              onPress={() => navigation.navigate(MainScreensNames.Notifications)}
            />
            <S.MainHeader type="HeadingsSB5">
              <FormattedMessage {...messages.accountBalance} />
            </S.MainHeader>
            <S.TotalBalance>
              <FormattedNumberParts
                style="decimal"
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                value={totalAmount.usd}
              >
                {(parts) => (
                  <S.TotalBalanceNumber>
                    {parts.map(({ type, value }, index) =>
                      type === 'integer' ? (
                        // eslint-disable-next-line react/no-array-index-key
                        <S.TotalBalanceInt key={index} type="HeadingsSB1">
                          {value}
                        </S.TotalBalanceInt>
                      ) : (
                        <S.TotalBalanceFractional
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          type="HeadingsSB5"
                        >
                          {renderNumberChar(type, value)}
                        </S.TotalBalanceFractional>
                      ),
                    )}
                    <S.TotalBalanceFractional type="HeadingsSB5">
                      {' '}
                      USD
                    </S.TotalBalanceFractional>
                  </S.TotalBalanceNumber>
                )}
              </FormattedNumberParts>
            </S.TotalBalance>
            <S.InBtc type="HeadingsSB6">
              <UnifiedNumber roughly value={totalAmount.btc} currency="btc" />
            </S.InBtc>
            {!!(balances.fiat || balances.crypto || balances.exchange) && (
              <S.BalancesWrapper>
                {!!balances.fiat && (
                  <S.WalletBalance
                    title={<FormattedMessage {...messages.currency} />}
                    amount={balances.fiat}
                    total={totalAmount.usd}
                    currency="usd"
                  />
                )}
                {!!balances.crypto && (
                  <S.WalletBalance
                    title={<FormattedMessage {...messages.cryptoCurrency} />}
                    amount={balances.crypto}
                    total={totalAmount.usd}
                    currency="usd"
                  />
                )}
                {!!balances.exchange && (
                  <S.WalletBalance
                    title={<FormattedMessage {...messages.exchange} />}
                    amount={balances.exchange}
                    total={totalAmount.usd}
                    currency="usd"
                  />
                )}
              </S.BalancesWrapper>
            )}
          </S.MainContainerStyled>
        </ScrollView>
      ) : (
        <S.LoaderStyled />
      )}
      {!!balancesHeight && (
        <BottomSheetStatic
          ref={bottomSheetRef}
          onOpen={() => setBottomSheetOpened(true)}
          onClose={() => setBottomSheetOpened(false)}
          title={<FormattedMessage {...messages.fastAction} />}
          snapStart={bottomSheetSnapStart}
        >
          <S.ActionListStyled
            items={[
              {
                id: '0',
                icon: 'fiat-plus',
                title: (
                  <FormattedMessage
                    {...messages.refillCurrency}
                    values={{ currency: 'IDR' }}
                  />
                ),
                onPress: handlePressRefill,
              },
              {
                id: '1',
                icon: 'shopping-cart',
                title: <FormattedMessage {...messages.buyCrypto} />,
                onPress: () => navigation.navigate(MainScreensNames.SwapNavigator),
              },
              {
                id: '2',
                icon: 'receive',
                title: <FormattedMessage {...messages.receiveCrypto} />,
                onPress: () => navigation.navigate(MainScreensNames.Wallets),
              },
              {
                id: '3',
                icon: 'nrfx-logo',
                title: <FormattedMessage {...messages.buyNarfexToken} />,
                onPress: () => dispatch(openExternalUrl(BUY_TOKEN_URL)),
              },
            ]}
          />
        </BottomSheetStatic>
      )}
    </S.MainWrapper>
  );
};
