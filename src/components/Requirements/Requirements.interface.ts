import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface RequirementsProps {
  requirementMap: Array<{ title: ReactNode; validator: RegExp }>;
  onSuccess: () => void;
  currentInputValue: string;
  touched: boolean;
  style?: ViewStyle;
}
