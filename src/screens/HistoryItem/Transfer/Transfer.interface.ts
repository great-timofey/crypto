import { Currency } from '$global/types';
import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';

export interface HistoryItemTransferProps {
  type: HistoryListTypeEnum.transferSend | HistoryListTypeEnum.transferReceive;
  address: string;
  amount: number;
  createdAt: number;
  currency: Currency;
  id: number;
}
