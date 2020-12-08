import { HistoryListItem } from '$components/HistoryList/HistoryList.interface';
import { Balance, Wallet } from '$redux/wallets/interface';

export interface ApiFiatWalletExchangePostResponse {
  history: HistoryListItem;
  wallet: Wallet;
  balance: Balance;
}
