import React, { FC, useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native';

import { WalletCell } from './WalletCell/WalletCell';
import * as S from './Wallets.styles';

import { WalletsScreenNavigationProp } from '$navigation/main/MainNavigator.interface';
import { BalanceExtended, WalletExtended } from '$redux/wallets/interface';
import { MainScreensNames } from '$navigation/names';
import { StatusBar, Loader } from '$components';
import { BOTTOM_TAB_BAR_HEIGHT } from '$global/constants';
import messages from '$i18n/shared/currencies.messages';
import { darkenStatusBar, lightenStatusBar } from '$global/statusBar';
import { walletsActions } from '$redux/wallets';
import { walletsSelector } from '$redux/selectors';

type WalletsProps = {
  navigation: WalletsScreenNavigationProp;
};

export const Wallets: FC<WalletsProps> = ({ navigation }) => {
  // const [walletsSheetOpen, setWalletsSheetOpen] = useState(false);
  // const [accountSheetOpen, setAccountSheetOpen] = useState(false);
  const theme = useTheme();
  const { bottom } = useSafeArea();
  const dispatch = useDispatch();
  const wallets = useSelector(walletsSelector);

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 300);
  }, []);

  // const accountSheetRef = useRef<BottomSheetComponent>(null);
  // const walletsSheetRef = useRef<BottomSheetComponent>(null);

  useEffect(() => {
    dispatch(walletsActions.loadWallets());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        darkenStatusBar();
        return;
      }

      lightenStatusBar();
    }, [theme]),
  );

  const handleRefresh = () => {
    dispatch(walletsActions.refreshWallets());
  };

  const handleWalletPress = (id: WalletExtended['id']) => () => {
    dispatch(walletsActions.loadWallet(id));
    navigation.navigate(MainScreensNames.Wallet);
  };

  const handleBalancePress = (id: BalanceExtended['id']) => () => {
    dispatch(walletsActions.loadBalance(id));
    navigation.navigate(MainScreensNames.Wallet);
  };

  if (!wallets.wallets.length) {
    return (
      <S.ActivityIndicatorStyled
        appearance={theme.isCurrent('light') ? 'dark' : 'light'}
      />
    );
  }

  // const handleOpenSheet = (openWallets: boolean) => () => {
  //   openWallets ? setWalletsSheetOpen(true) : setAccountSheetOpen(true);
  //
  //   if (theme.isCurrent('light')) {
  //     lightenStatusBar();
  //   }
  //
  //   setTimeout(() => {
  //     navigation.setParams({ tabBarVisible: false });
  //     (openWallets ? walletsSheetRef : accountSheetRef).current?.snapTo(1);
  //   }, 10);
  // };
  //
  // const handleCloseSheet = (closeWallets: boolean) => () => {
  //   (closeWallets ? walletsSheetRef : accountSheetRef)?.current?.snapTo(0);
  //
  //   if (theme.isCurrent('light')) {
  //     darkenStatusBar();
  //   }
  //
  //   setTimeout(() => {
  //     navigation.setParams({ tabBarVisible: true });
  //   }, 10);
  //
  //   closeWallets ? setWalletsSheetOpen(false) : setAccountSheetOpen(false);
  // };

  // //  TODO: change to real currencies list
  // const dataA = [
  //   { id: 1, name: 'Etherium' },
  //   { id: 2, name: 'Etherium' },
  //   { id: 3, name: 'Etherium' },
  //   { id: 4, name: 'Etherium' },
  //   { id: 5, name: 'Etherium' },
  //   { id: 10, name: 'Etherium' },
  //   { id: 20, name: 'Etherium' },
  //   { id: 300, name: 'Etherium' },
  //   { id: 4343, name: 'Etherium' },
  //   { id: 50000, name: 'Etherium' },
  //   { id: 1, name: 'Etherium' },
  //   { id: 2, name: 'Etherium' },
  //   { id: 3, name: 'Etherium' },
  //   { id: 4, name: 'Etherium' },
  //   { id: 5, name: 'Etherium' },
  //   { id: 10, name: 'Etherium' },
  //   { id: 20, name: 'Etherium' },
  //   { id: 300, name: 'Etherium' },
  //   { id: 4343, name: 'Etherium' },
  //   { id: 50000, name: 'Etherium' },
  // ];
  //
  // const dataB = [
  //   { id: 1, name: 'Etherium' },
  //   { id: 1, name: 'Etherium' },
  //   { id: 1, name: 'Etherium' },
  // ];

  // const renderSheetItem = ({ index }: { index: number }) => (
  //   <S.WalletsBottomSheetItemStyled
  //     caption={<Coin currency={walletsSheetOpen ? 'btc' : 'usd'} />}
  //   >
  //     <Typography type="HeadingsSB6">
  //       {index === dataA.length - 1 ? 'last item' : 'Bitconin'}
  //     </Typography>
  //     <Typography type="HeadingsR6">BTC</Typography>
  //   </S.WalletsBottomSheetItemStyled>
  // );

  if (wallets.loading || showLoader) {
    return (
      <S.WalletsLoaderWrapperStyled>
        <Loader appearance={theme.isCurrent('light') ? 'dark' : 'light'} />
      </S.WalletsLoaderWrapperStyled>
    );
  }

  return (
    <>
      <StatusBar />
      <S.WalletsContainerStyled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottom + BOTTOM_TAB_BAR_HEIGHT + 32,
        }}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.foregroundPrimary}
            refreshing={wallets.refresh}
            onRefresh={handleRefresh}
          />
        }
      >
        <S.WalletsHeaderStyled type="HeadingsSB4">
          <FormattedMessage {...messages.cryptocurrencies} />
        </S.WalletsHeaderStyled>

        {wallets.wallets.map((wallet) => (
          <WalletCell
            id={wallet.id}
            key={wallet.currency}
            currency={wallet.currency}
            amount={wallet.amount}
            onPress={handleWalletPress(wallet.id)}
          />
        ))}

        {/*<Button*/}
        {/*  onPress={handleOpenSheet(true)}*/}
        {/*  title={<FormattedMessage {...messages.addCurrencyWalletPlus} />}*/}
        {/*  appearance="outline"*/}
        {/*  style={{ marginBottom: 40 }}*/}
        {/*/>*/}

        <S.WalletsHeaderStyled type="HeadingsSB4">
          <FormattedMessage {...messages.currencies} />
        </S.WalletsHeaderStyled>

        {wallets.balances.map((balance) => (
          <WalletCell
            id={balance.id}
            key={balance.currency}
            currency={balance.currency}
            amount={balance.amount}
            onPress={handleBalancePress(balance.id)}
          />
        ))}

        {/*<Button*/}
        {/*  appearance="outline"*/}
        {/*  onPress={handleOpenSheet(false)}*/}
        {/*  title={<FormattedMessage {...messages.addCurrencyAccountPlus} />}*/}
        {/*/>*/}
      </S.WalletsContainerStyled>

      {/*<BottomSheet*/}
      {/*  opened={walletsSheetOpen}*/}
      {/*  ref={walletsSheetRef}*/}
      {/*  onClose={handleCloseSheet(true)}*/}
      {/*  onOpen={() => setWalletsSheetOpen(true)}*/}
      {/*  showCloseButton*/}
      {/*  contentContainerStyle={{*/}
      {/*    backgroundColor: theme.colors.backgroundSecondary,*/}
      {/*    paddingHorizontal: 16,*/}
      {/*  }}*/}
      {/*  header={*/}
      {/*    <S.WalletsBottomSheetTitleStyled type="HeadingsSB4">*/}
      {/*      <FormattedMessage {...messages.addCryptocurrency} />*/}
      {/*    </S.WalletsBottomSheetTitleStyled>*/}
      {/*  }*/}
      {/*>*/}
      {/*  <FlatList*/}
      {/*    data={dataA}*/}
      {/*    showsVerticalScrollIndicator={false}*/}
      {/*    renderItem={renderSheetItem}*/}
      {/*    contentContainerStyle={{ paddingBottom: bottom }}*/}
      {/*  />*/}
      {/*</BottomSheet>*/}

      {/*<BottomSheet*/}
      {/*  opened={accountSheetOpen}*/}
      {/*  ref={accountSheetRef}*/}
      {/*  onClose={handleCloseSheet(false)}*/}
      {/*  onOpen={() => setAccountSheetOpen(true)}*/}
      {/*  showCloseButton*/}
      {/*  contentContainerStyle={{*/}
      {/*    backgroundColor: theme.colors.backgroundSecondary,*/}
      {/*    paddingHorizontal: 16,*/}
      {/*  }}*/}
      {/*  header={*/}
      {/*    <S.WalletsBottomSheetTitleStyled type="HeadingsSB4">*/}
      {/*      <FormattedMessage {...messages.addCurrencyAccount} />*/}
      {/*    </S.WalletsBottomSheetTitleStyled>*/}
      {/*  }*/}
      {/*>*/}
      {/*  <FlatList*/}
      {/*    data={dataB}*/}
      {/*    showsVerticalScrollIndicator={false}*/}
      {/*    renderItem={renderSheetItem}*/}
      {/*    contentContainerStyle={{ paddingBottom: bottom }}*/}
      {/*  />*/}
      {/*</BottomSheet>*/}
    </>
  );
};
