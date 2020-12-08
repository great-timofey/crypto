import { Currency } from '$global/types';
import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';

export interface HistoryItemSwapProps {
  type: HistoryListTypeEnum.swap;
  id: number;
  createdAt: number;
  price: number;
  primaryAmount: number;
  primaryCurrency: Currency;
  secondaryAmount: number;
  secondaryCurrency: Currency;
  status: string; // TODO
}
