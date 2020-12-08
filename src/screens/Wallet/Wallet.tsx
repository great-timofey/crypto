import React, { FC, useCallback, useMemo } from 'react';
import { useSafeArea } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './Wallet.styles';
import { WalletNavbar } from './WalletNavbar/WalletNavbar';
import { WalletHistoryHeader } from './WalletHistoryHeader';

import { useClipboard } from '$hooks';
import { LAST_NOTIFICATION_PADDING } from '$screens/Notifications/constants';
import { platformSelect } from '$global/device';
import { upperFirst } from '$global/utils';
import { CurrenciesItem } from '$redux/wallets/interface';
import { StatusBar, HistoryList, LocalizedCurrency } from '$components';
import { prepareHistoryItemsToDisplay } from '$global/historyItems/utils';
import { darkenStatusBar, lightenStatusBar } from '$global/statusBar';
import { BOTTOM_TAB_BAR_HEIGHT } from '$global/constants';
import { Currency, CurrencyType } from '$global/types';
import messages from '$i18n/shared/currencies.messages';
import { balanceSelector, currencySelector, walletSelector } from '$redux/selectors';
import { walletsActions } from '$redux/wallets/index';

export const Wallet: FC = () => {
  const wallet = useSelector(walletSelector);
  const balance = useSelector(balanceSelector);
  const { bottom } = useSafeArea();

  const isCryptocurrency = !!wallet.id;

  const history = isCryptocurrency ? wallet.history : balance.history;

  const currency: CurrenciesItem = useSelector(
    currencySelector(isCryptocurrency ? wallet.currency : balance.currency),
  );

  const type = isCryptocurrency ? CurrencyType.crypto : CurrencyType.fiat;
  let name: string;
  let abbr: Currency;
  let amount: number;
  let complementaryAmount: number;
  let complementaryCurrency: Currency;
  let refreshing: boolean;

  if (isCryptocurrency) {
    name = currency.name;
    abbr = currency.abbr;
    amount = wallet.amount;
    refreshing = wallet.refresh;
    complementaryAmount = wallet.amount * wallet.toUsd;
    complementaryCurrency = 'usd';
  } else {
    name = currency.name;
    abbr = currency.abbr;
    amount = balance?.amount ?? 0;
    refreshing = wallet.refresh;
    //  TODO: add current BTC rate
    complementaryAmount = balance.amount / balance.toBtc;
    complementaryCurrency = 'btc';
  }

  const theme = useTheme();
  const intl = useIntl();
  const dispatch = useDispatch();

  const copyableWalletAddress = wallet.address;

  const { handleCopyToClipboard } = useClipboard(
    copyableWalletAddress,
    intl.formatMessage(messages.addressCopiedToClipboard),
  );

  const handleEndReached = useCallback(() => {
    if (isCryptocurrency) {
      if (!wallet.history.loading && wallet.history.next) {
        dispatch(walletsActions.loadWalletHistory());
      }
    } else if (!balance.history.loading && balance.history.next) {
      dispatch(walletsActions.loadBalanceHistory());
    }
  }, [
    dispatch,
    isCryptocurrency,
    balance.history.loading,
    balance.history.next,
    wallet.history.loading,
    wallet.history.next,
  ]);

  const handleRefresh = useCallback(() => {
    if (isCryptocurrency) {
      dispatch(walletsActions.refreshWallet());
    } else {
      dispatch(walletsActions.refreshBalance());
    }
  }, [dispatch, isCryptocurrency]);

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        darkenStatusBar();
        return;
      }

      lightenStatusBar();
    }, [theme]),
  );

  const listItems = useMemo(
    () => prepareHistoryItemsToDisplay([...history.items], intl),
    [history.items, intl],
  );

  const Header = useMemo(() => {
    const props = {
      name,
      abbr,
      type,
      amount,
      isCryptocurrency,
      complementaryAmount,
      complementaryCurrency,
      copyableWalletAddress,
      handleCopyToClipboard,
    };

    return () => <WalletHistoryHeader {...props} />;
  }, [
    name,
    abbr,
    type,
    amount,
    isCryptocurrency,
    complementaryAmount,
    complementaryCurrency,
    copyableWalletAddress,
    handleCopyToClipboard,
  ]);

  return (
    <S.WalletContainerStyled
      style={{
        paddingTop: platformSelect(16, 0),
        paddingBottom: BOTTOM_TAB_BAR_HEIGHT + bottom + LAST_NOTIFICATION_PADDING,
      }}
    >
      <StatusBar />
      <WalletNavbar skipCloseButton>
        <FormattedMessage
          {...(isCryptocurrency
            ? messages.cryptocurrencyWallet
            : messages.currencyAccount)}
        />
      </WalletNavbar>
      <S.WalletHistoryContainerStyled>
        <HistoryList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          listHeaderComponent={Header}
          onEndReached={handleEndReached}
          items={listItems}
          loading={history.loading}
          loadingError={history.error}
          emptyIcon="17"
          emptyText={
            <FormattedMessage
              {...messages.currencyHistoryEmpty}
              values={{
                currency: (
                  <LocalizedCurrency
                    type={type}
                    abbr={abbr}
                    cryptoName={upperFirst(name)}
                  />
                ),
              }}
            />
          }
        />
      </S.WalletHistoryContainerStyled>
    </S.WalletContainerStyled>
  );
};
