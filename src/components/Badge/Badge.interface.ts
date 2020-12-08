import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface BadgeProps {
  badgeContent: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}
