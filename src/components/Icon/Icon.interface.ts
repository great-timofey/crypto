import { ViewStyle } from 'react-native';

import { iconsMap } from './constants';

export interface IconProps {
  name: IconName;
  style?: ViewStyle;
  fill?: string;
}

export type IconName = keyof typeof iconsMap;
