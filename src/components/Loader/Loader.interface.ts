import { ViewStyle } from 'react-native';

type LoaderAppearance = 'light' | 'dark';

export interface LoaderProps {
  fill?: string;
  style?: ViewStyle;
  toastMode?: boolean;
  appearance?: LoaderAppearance;
}
