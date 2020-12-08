import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface CaptionCellProps {
  caption?: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  iconRight?: ReactNode;
}
