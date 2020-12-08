import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { SectionListRenderItemInfo } from 'react-native';

import { HistoryItem } from '../HistoryItem/HistoryItem';
import { HistoryItemProps } from '../HistoryItem/HistoryItem.interface';
import { UnifiedNumber } from '../UnifiedNumber/UnifiedNumber';

import messages from './HistoryList.messages';
import { HistoryListItem, HistoryListTypeEnum } from './HistoryList.interface';

import { StatusEnum } from '$global/types';

export const HistoryItemRenderer = memo(
  ({ item }: SectionListRenderItemInfo<HistoryListItem>) => {
    let params: HistoryItemProps = {};
    let title;
    let info;

    switch (item.type) {
      case HistoryListTypeEnum.transferReceive: {
        title = messages.transferReceiveTitle;
        info = {
          ...messages.transferReceiveInfo,
          values: { user: item.address },
        };
        params = {
          amount: item.amount,
          amountColor: 'success2',
          currency: item.currency,
          iconFill: 'success2',
          icon: 'receive',
          showPlusSign: true,
        };
        break;
      }
      case HistoryListTypeEnum.transactionReceive: {
        title = messages.transactionReceiveTitle;
        info = {
          ...messages.transactionReceiveInfo,
          values: { address: item.address },
        };
        params = {
          amount: item.amount,
          amountColor: 'success2',
          currency: item.currency,
          icon: 'receive',
          iconFill: 'success2',
          showPlusSign: true,
        };
        break;
      }
      case HistoryListTypeEnum.userAuthorize: {
        title = messages.userAuthorizeTitle;
        info = {
          ...messages.userAuthorizeInfo,
          values: {
            device: item.platformName ? (
              `${item.platformName} ${item.browserName}`
            ) : (
              <FormattedMessage {...messages.unknownDevice} />
            ),
          },
        };
        params = {
          icon: 'attention',
          iconFill: 'warning',
        };
        break;
      }
      case HistoryListTypeEnum.poolApproved: {
        title = messages.poolApproved;
        params = {
          amount: item.amount,
          currency: 'btc',
          amountColor: 'success2',
          icon: 'check-small',
          iconFill: 'success2',
        };
        break;
      }
      case HistoryListTypeEnum.refill: {
        title = messages.refillTitle;
        info = {
          ...messages.refillInfo,
          values: {
            bankCode: item.bankCode,
          },
        };
        params = {
          icon: 'fiat-plus',
          amount: item.amount,
          amountColor: 'success2',
          currency: item.currency,
          iconFill: 'success2',
          showPlusSign: true,
        };
        break;
      }
      case HistoryListTypeEnum.bankCardRefillReject: {
        title = messages.bankCardRefillReject;
        params = {
          icon: 'fiat-plus',
          amount: item.amount,
          amountColor: 'error',
          currency: item.currency,
          iconFill: 'error',
          showPlusSign: true,
        };
        break;
      }
      case HistoryListTypeEnum.depositCompleted: {
        title = messages.refillTitle;
        info = {
          ...messages.refillInfo,
          values: {
            bankCode: item.bankCode,
          },
        };
        params = {
          icon: 'fiat-plus',
          amount: item.primaryAmount,
          amountColor: 'success2',
          currency: item.primaryCurrency,
          iconFill: 'success2',
        };
        break;
      }
      case HistoryListTypeEnum.withdrawal: {
        title = {
          ...messages.withdrawalTitle,
        };
        info = {
          ...messages.withdrawalInfo,
          values: {
            amount: (
              <UnifiedNumber
                fractionDigits={2}
                value={item.amount}
                currency={item.currency}
              />
            ),
            bank: item.bankCode,
            fee: item.fee,
          },
        };
        params = {
          icon: 'fiat',
          amount: item.amount,
          currency: item.currency,
          iconFill: item.status === StatusEnum.failed ? 'error' : 'gray',
        };
        break;
      }
      case HistoryListTypeEnum.swap:
      case HistoryListTypeEnum.buyToken: {
        title = messages.swapTitle;
        info = {
          ...messages.swapInfo,
          values: {
            amount: (
              <UnifiedNumber value={item.primaryAmount} currency={item.primaryCurrency} />
            ),
          },
        };
        params = {
          icon: 'exchange',
          amount: item.secondaryAmount,
          amountColor: 'success',
          currency: item.secondaryCurrency,
          iconFill: 'gray',
          showPlusSign: true,
        };
        break;
      }
      case HistoryListTypeEnum.transactionSend: {
        title = messages.transactionSendTitle;
        info = {
          ...messages.transactionSendInfo,
          values: {
            address: item.address,
          },
        };
        params = {
          icon: 'send',
          amount: item.amount,
          amountColor: 'gray',
          currency: item.currency,
          iconFill: 'gray',
        };
        break;
      }
      case HistoryListTypeEnum.transferSend: {
        title = messages.transferSendTitle;
        info = {
          ...messages.transferSendInfo,
          values: {
            user: item.address,
          },
        };
        params = {
          icon: 'send',
          amount: item.amount,
          amountColor: 'gray',
          currency: item.currency,
          iconFill: 'gray',
        };
        break;
      }
      default: {
        params.title = item.message || item.type || '-';
        params.info = item.info || '-';
      }
    }

    return (
      <HistoryItem
        {...params}
        highlight={item.highlight}
        title={params.title || (title && <FormattedMessage {...title} />)}
        info={params.info || (info && <FormattedMessage {...info} />)}
        time={item.createdAt}
        item={item}
      />
    );
  },
);
