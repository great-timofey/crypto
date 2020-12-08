import { Currency } from '$global/types';
import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';

export interface HistoryItemBankCardRefillRejectProps {
  type: HistoryListTypeEnum.refill;
  id: number;
  createdAt: number;
  currency: Currency;
  amount: number;
  fee: number;
}
