import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface CurrencyCardFooterSectionProps {
  style?: ViewStyle;
  icon?: ReactNode;
  ellipsized?: boolean;
  onPress?: () => void;
}
