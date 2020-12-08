import React, { useCallback, FC } from 'react';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import { FormattedMessage } from 'react-intl';

import * as S from './HistoryItem.styles';
import { HistoryItemSwap } from './Swap/Swap';
import { HistoryItemTransfer } from './Transfer/Transfer';
import { HistoryItemTransaction } from './Transaction/Transaction';
import { HistoryItemWithdrawal } from './Withdrawal/Withdrawal';
import { HistoryItemRefill } from './Refill/Refill';
import { HistoryItemUserAuthorize } from './UserAuthorize/UserAuthorize';
import { HistoryItemBankCardRefillReject } from './BankCardRefillReject/BankCardRefillReject';
import { HistoryItemScreenProps } from './HistoryItem.interface';

import HistoryListMessages from '$components/HistoryList/HistoryList.messages';
import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';
import { addHitSlop } from '$global/utils';
import { BOTTOM_TAB_BAR_HEIGHT, DEFAULT_SCREEN_PADDING } from '$global/constants';
import { darkenStatusBar, lightenStatusBar } from '$global/statusBar';
import { StatusBar, Navbar, Button, Icon } from '$components';

export const HistoryItem: FC<HistoryItemScreenProps> = ({ navigation, route }) => {
  const theme = useTheme();
  const { bottom } = useSafeArea();

  const item = route.params.item;

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        darkenStatusBar();
      } else {
        lightenStatusBar();
      }
    }, [theme]),
  );

  let Component: FC<{ item: any }> = () => <></>;
  let title;

  switch (item.type) {
    case HistoryListTypeEnum.swap:
    case HistoryListTypeEnum.buyToken: {
      title = HistoryListMessages.swapTitle;
      Component = HistoryItemSwap;
      break;
    }
    case HistoryListTypeEnum.transferReceive: {
      title = HistoryListMessages.transferReceiveTitle;
      Component = HistoryItemTransfer;
      break;
    }
    case HistoryListTypeEnum.transferSend: {
      title = HistoryListMessages.transferSendTitle;
      Component = HistoryItemTransfer;
      break;
    }
    case HistoryListTypeEnum.transactionReceive: {
      title = HistoryListMessages.transactionReceiveTitle;
      Component = HistoryItemTransaction;
      break;
    }
    case HistoryListTypeEnum.transactionSend: {
      title = HistoryListMessages.transactionSendTitle;
      Component = HistoryItemTransaction;
      break;
    }
    case HistoryListTypeEnum.withdrawal: {
      title = HistoryListMessages.withdrawalTitle;
      Component = HistoryItemWithdrawal;
      break;
    }
    case HistoryListTypeEnum.refill: {
      title = HistoryListMessages.refillTitle;
      Component = HistoryItemRefill;
      break;
    }
    case HistoryListTypeEnum.userAuthorize: {
      title = HistoryListMessages.userAuthorizeTitle;
      Component = HistoryItemUserAuthorize;
      break;
    }
    case HistoryListTypeEnum.bankCardRefillReject: {
      title = HistoryListMessages.bankCardRefillReject;
      Component = HistoryItemBankCardRefillReject;
      break;
    }
    default:
  }

  return (
    <S.HistoryItemContainerStyled>
      <StatusBar barStyle="dark-content" />
      <Navbar
        leftContent={
          <Button
            appearance="icon"
            onPress={() => navigation?.goBack()}
            touchableProps={{ ...addHitSlop([20]) }}
          >
            <Icon name="angle-left" fill={theme.colors.primaryBlue} />
          </Button>
        }
      >
        {title && <FormattedMessage {...title} />}
      </Navbar>
      <S.HistoryItemBodyStyled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: BOTTOM_TAB_BAR_HEIGHT + bottom,
          paddingHorizontal: DEFAULT_SCREEN_PADDING,
        }}
      >
        <Component item={item} />
      </S.HistoryItemBodyStyled>
    </S.HistoryItemContainerStyled>
  );
};
