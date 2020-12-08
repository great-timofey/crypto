import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import { Currency } from '$global/types';

export interface WalletBalanceProps {
  amount: number;
  total: number;
  title: ReactNode;
  currency: Currency;
  style?: ViewStyle;
}
