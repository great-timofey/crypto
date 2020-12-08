import { Currency } from '$global/types';
import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';

export interface HistoryItemRefillProps {
  type: HistoryListTypeEnum.refill;
  id: number;
  bankCode: string;
  createdAt: number;
  fee: number;
  amount: number;
  currency: Currency;
}
