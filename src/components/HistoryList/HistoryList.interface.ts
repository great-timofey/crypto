import { SectionListData, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

import { IconName } from '$components/Icon/Icon.interface';

export interface HistoryListProps<Item> {
  items: SectionListData<Item>[];
  onEndReached?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  style?: ViewStyle;
  paginationOver?: boolean;
  loading: boolean;
  loadingError?: boolean;
  contentContainerStyle?: ViewStyle;
  emptyText?: ReactNode;
  emptyIcon?: IconName;
  emptyStyle?: ViewStyle;
  listHeaderComponent?: ReactNode;
}

export interface HistoryListItem {
  createdAt: number;
  type: HistoryListTypeEnum;
  [key: string]: any;
}

export enum HistoryListTypeEnum {
  transferReceive = 'transfer_receive',
  transactionReceive = 'transaction_receive',
  userAuthorize = 'user_authorize',
  poolApproved = 'pool_approved',
  refill = 'refill',
  bankCardRefillReject = 'bank_card_refill_reject',
  depositCompleted = 'deposit_completed',
  withdrawalReject = 'withdrawal_reject',
  withdrawal = 'withdrawal',
  swap = 'swap',
  transactionSend = 'transaction_send',
  transferSend = 'transfer_send',
  buyToken = 'buy_token',
}
