import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import { IconName } from '../Icon/Icon.interface';

export type ListItemType = 'list-1' | 'list-2' | 'list-3' | 'list-menu';

export interface ListItemProps {
  style?: ViewStyle;
  type?: ListItemType;
  onPress?: () => void;
  icon?: IconName;
  iconFill?: string;
  label: ReactNode;
  info?: ReactNode;
  angle?: boolean;
  control?: ReactNode;
  suffix?: string;
  description?: ReactNode;
}
