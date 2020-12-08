import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import { IconName } from '../../Icon/Icon.interface';

export interface ActionItemProps {
  title: ReactNode;
  icon: IconName;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  onPress?(): void;
}
