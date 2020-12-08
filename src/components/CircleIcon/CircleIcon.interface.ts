import { ViewStyle, ImageURISource } from 'react-native';

import { IconProps } from '../Icon/Icon.interface';

export interface CircleIconProps {
  style?: ViewStyle;
  fill?: string;
  uri?: string;
  gradient?: [string, string];
  loading?: boolean;
  name?: IconProps['name'];
  size?: number;
  source?: ImageURISource | null;
}
