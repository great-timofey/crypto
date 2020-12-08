import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface CustomKeyboardProps {
  onInput: (value: string) => void;
  onFullErase?: () => void;
  onErase: () => void;
  type?: CustomKeyboardType;
  style?: ViewStyle;

  /** button at left bottom corner */
  actionButton?: ReactNode;

  error?: boolean;
}

export type CustomKeyboardType = 'numeric' | 'code';
