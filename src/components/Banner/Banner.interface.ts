import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface BannerProps {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
  onPress: () => void;
}
