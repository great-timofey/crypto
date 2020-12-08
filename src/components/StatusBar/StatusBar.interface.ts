import { StatusBarStyle, ViewStyle } from 'react-native';

import { NarfexThemeColor } from '$global/theme';

export interface StatusBarProps {
  barStyle?: StatusBarStyle;

  /**
   * by default component will use opposite status bar colors for light and dark themes
   * because screens usually have opposite background colors different themes
   * use ignoreTheme={true} for prevent this behaviour
   */
  ignoreTheme?: boolean;

  /** key of Narfex theme colors */
  backgroundColorKey?: NarfexThemeColor;
  style?: ViewStyle;
}

export interface StatusBarContainerStyledProps {
  height?: number;
  backgroundColorKey: NarfexThemeColor;
}
