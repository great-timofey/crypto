import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import { IconName } from '../Icon/Icon.interface';

export type ActionListItemType = {
  id: string;
  icon: IconName;
  title: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export interface ActionListProps {
  items: ActionListItemType[];
  style?: ViewStyle;
}
