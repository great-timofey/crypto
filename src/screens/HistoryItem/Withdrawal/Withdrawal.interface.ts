import { Currency, StatusEnum } from '$global/types';
import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';

export interface HistoryItemWithdrawalProps {
  type: HistoryListTypeEnum.withdrawal;
  accountNumber: string;
  accountHolderName: string;
  bankCode: string;
  createdAt: number;
  fee: number;
  id: number;
  status: StatusEnum;
  amount: number;
  currency: Currency;
}
