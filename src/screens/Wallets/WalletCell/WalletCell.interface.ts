import { Currency } from '$global/types';

export interface WalletCellProps {
  currency: Currency;
  id: number;
  amount: number;
  onPress: () => void;
}
