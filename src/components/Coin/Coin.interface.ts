import { ViewStyle } from 'react-native';

import { CircleIconProps } from '../CircleIcon/CircleIcon.interface';

import { Currency } from '$global/types';

export interface CoinProps {
  currency: Currency;
  style?: ViewStyle;
  name?: CircleIconProps['name'];
  size?: number;
  loading?: CircleIconProps['loading'];
}
