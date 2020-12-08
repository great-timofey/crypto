import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface NavbarProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children: ReactNode;
  style?: ViewStyle;
}
