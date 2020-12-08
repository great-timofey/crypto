import { CryptoCurrency, StatusEnum } from '$global/types';
import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';

export interface HistoryItemTransactionProps {
  type: HistoryListTypeEnum.transactionSend | HistoryListTypeEnum.transactionReceive;
  address: string;
  amount: number;
  fee: number;
  confirmations: number;
  createdAt: number;
  currency: CryptoCurrency;
  id: number;
  requiredConfirmations: number;
  status: StatusEnum.done;
  txid: string;
  transactionState: string;
}
