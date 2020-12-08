import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import QRCode from 'react-native-qrcode-svg';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

import { CURRENCY_RECEIVE_BOTTOMSHEET_WARNING_HEIGHT, QRCODE_SIZE } from './constants';
import { CurrencyReceiveProps } from './CurrencyReceive.interface';
import * as S from './CurrencyReceive.styles';

import { useClipboard } from '$hooks';
import { BottomSheet, Button, Icon, Navbar, StatusBar, Typography } from '$components';
import { walletsActions } from '$redux/wallets';
import { BOTTOM_TAB_BAR_HEIGHT, DEFAULT_SCREEN_PADDING } from '$global/constants';
import { mrIX } from '$global/device';
import { darkenStatusBar, lightenStatusBar } from '$global/statusBar';
import { addHitSlop } from '$global/utils';
import messages from '$i18n/shared/currencies.messages';
import { MainScreensNames } from '$navigation/names';
import {
  commonSelector,
  currencySelector,
  userSelector,
  walletsSelector,
} from '$redux/selectors';
import { AppDispatch } from '$redux/store';
import { WalletOperationEnum } from '$redux/wallets/interface';

export const CurrencyReceive: FC<CurrencyReceiveProps> = ({ navigation, route }) => {
  const theme = useTheme();
  const intl = useIntl();
  const { login } = useSelector(userSelector);
  const { devMode } = useSelector(commonSelector);
  const {
    wallet: { address, currency },
    currencySendAddressWarningSeen,
  } = useSelector(walletsSelector);
  const currencyData = useSelector(currencySelector(currency));
  const { bottom } = useSafeArea();
  const [activeTab, setActiveTab] = useState(WalletOperationEnum.transfer);
  const dispatch = useDispatch<AppDispatch>();
  const [warningSheetOpen, setWarningSheetOpen] = useState(false);
  const warningSheetRef = useRef<BottomSheetBehavior>(null);
  const fullScreen = route.params?.fullScreen;

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        darkenStatusBar();
        return;
      }

      lightenStatusBar();
    }, [theme]),
  );

  const { handleCopyToClipboard } = useClipboard(
    activeTab === WalletOperationEnum.transfer ? login : address,
    intl.formatMessage(
      activeTab === WalletOperationEnum.transfer
        ? messages.loginCopiedToClipboard
        : messages.addressCopiedToClipboard,
    ),
    () => (devMode ? handleOpenSheet() : undefined),
  );

  const handleOpenSheet = useCallback(() => {
    setWarningSheetOpen(true);

    setTimeout(() => {
      navigation.setParams({ tabBarVisible: false });
      warningSheetRef.current?.snapTo(1);
    }, 10);
  }, [navigation]);

  useEffect(() => {
    if (currencySendAddressWarningSeen) return;

    if (activeTab === WalletOperationEnum.transaction) {
      handleOpenSheet();
    }
  }, [currencySendAddressWarningSeen, activeTab, handleOpenSheet]);

  const handleCloseSheet = () => {
    warningSheetRef.current?.snapTo(0);

    setTimeout(() => {
      navigation.setParams({ tabBarVisible: true });
    }, 10);

    setWarningSheetOpen(false);
    dispatch(walletsActions.setCurrencySendAddressWarningSeen(true));
    dispatch(walletsActions.updateCurrencySendAddressWarningSeen());
  };

  return (
    <>
      <S.CurrencyReceiveContainerStyled
        style={{
          paddingBottom: fullScreen
            ? 0
            : bottom +
              BOTTOM_TAB_BAR_HEIGHT +
              (activeTab === WalletOperationEnum.transfer ? 8 : 0),
        }}
      >
        <StatusBar />
        <Navbar
          leftContent={
            <Button
              appearance="icon"
              onPress={() => navigation?.goBack()}
              touchableProps={{ ...addHitSlop([0, 20]) }}
            >
              <Icon name="angle-left" fill={theme.colors.darkBlue} />
            </Button>
          }
        >
          <FormattedMessage
            {...messages.receiveCurrency}
            values={{ currency: currencyData?.name }}
          />
        </Navbar>

        <S.CurrencyReceiveContentWrapperStyled>
          <S.TabsStyled
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { name: WalletOperationEnum.transfer, title: 'Narfex' },
              {
                name: WalletOperationEnum.transaction,
                title: <FormattedMessage key="0" {...messages.blockchain} />,
              },
            ]}
          />
          {activeTab === WalletOperationEnum.transfer ? (
            <>
              <S.CurrencyReceiveLoginContainerStyled>
                <S.CurrencyReceiveLoginInstructionTitleStyled type="HeadingsSB6">
                  <FormattedMessage
                    {...messages.narfexUsersAbleToSendYouCurrencyByLogin}
                    values={{ currency: currencyData?.name }}
                  />
                </S.CurrencyReceiveLoginInstructionTitleStyled>
                <S.CurrencyReceiveCopyButtonStyled
                  centerContent
                  onPress={handleCopyToClipboard}
                  {...addHitSlop([40, 10])}
                >
                  <S.CurrencyReceiveCopyButtonTitleStyled type="HeadingsSB2">
                    {login}
                  </S.CurrencyReceiveCopyButtonTitleStyled>
                  <S.CurrencyReceiveLoginCopyIconStyled
                    name="copy"
                    fill={theme.colors.darkBlue}
                  />
                </S.CurrencyReceiveCopyButtonStyled>
              </S.CurrencyReceiveLoginContainerStyled>
              {fullScreen ? (
                <></>
              ) : (
                <S.BannerStyled
                  onPress={() => navigation.navigate(MainScreensNames.SwapNavigator)}
                  iconLeft={<Icon name="15" />}
                  iconRight={<Icon name="angle-right" />}
                >
                  <Typography type="HeadingsSB6">
                    <FormattedMessage
                      {...messages.buyCurrencyProfitably}
                      values={{ currency: currencyData?.name }}
                    />
                  </Typography>
                </S.BannerStyled>
              )}
            </>
          ) : (
            <S.CurrencyReceiveBlockchainContainerStyled
              contentContainerStyle={{
                paddingBottom: 20,
              }}
              showsVerticalScrollIndicator={false}
            >
              <S.CurrencyReceiveBlockchainAddress type="HeadingsSB5">
                <FormattedMessage
                  {...messages.walletAddressForBlockchainTransfer}
                  values={{ currency: currencyData?.name }}
                />
              </S.CurrencyReceiveBlockchainAddress>
              <S.CurrencyReceiveCopyButtonStyled
                onPress={handleCopyToClipboard}
                {...addHitSlop([40, 0])}
              >
                <S.CurrencyReceiveCopyButtonTitleStyled alignLeft type="HeadingsSB5">
                  {address}
                </S.CurrencyReceiveCopyButtonTitleStyled>
                <S.CurrencyReceiveLoginCopyIconStyled
                  alignTop
                  name="copy16px"
                  fill={theme.colors.darkBlue}
                />
              </S.CurrencyReceiveCopyButtonStyled>
              <S.QRContainerStyled>
                <QRCode size={QRCODE_SIZE} value={address} />
              </S.QRContainerStyled>
              <S.TipStyled type="BodyText3R">
                <FormattedMessage
                  {...messages.currencyOnlyReceiveWarningShort}
                  values={{
                    currency: currencyData?.name,
                    otherCurrency: 'Bitcoin Cash BCH',
                  }}
                />
              </S.TipStyled>
            </S.CurrencyReceiveBlockchainContainerStyled>
          )}
        </S.CurrencyReceiveContentWrapperStyled>
      </S.CurrencyReceiveContainerStyled>
      <BottomSheet
        showFakeTabBar={!fullScreen}
        opened={warningSheetOpen}
        ref={warningSheetRef}
        onClose={handleCloseSheet}
        fixedSnapPoints={[0, CURRENCY_RECEIVE_BOTTOMSHEET_WARNING_HEIGHT]}
        onOpen={() => setWarningSheetOpen(true)}
        contentContainerStyle={{
          backgroundColor: theme.colors.backgroundSecondary,
          paddingHorizontal: DEFAULT_SCREEN_PADDING,
          paddingTop: mrIX ? 32 : 20,
          paddingBottom: mrIX ? 58 : 8,
        }}
      >
        <S.BottomSheetContentWrapperStyled>
          <S.BottomSheetHeaderStyled type="HeadingsSB4">
            <FormattedMessage {...messages.warning} />
          </S.BottomSheetHeaderStyled>
          <S.BottomSheetIconWrapperStyled>
            <Icon name="21" />
          </S.BottomSheetIconWrapperStyled>
          <Typography type="BodyText3R">
            <FormattedMessage {...messages.currencyOnlyReceiveWarningLong} />
          </Typography>
        </S.BottomSheetContentWrapperStyled>
        <S.BottomSheetButtonStyled
          title={<FormattedMessage {...messages.gotIt} />}
          onPress={handleCloseSheet}
        />
      </BottomSheet>
    </>
  );
};
