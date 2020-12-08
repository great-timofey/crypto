import { StatusBarStyle } from 'react-native';

import { LightTheme, NarfexTheme } from '$global/theme';

export function getBarStyle(
  barStyle: StatusBarStyle,
  theme: NarfexTheme,
): StatusBarStyle {
  const isLightTheme = theme === LightTheme;

  if (isLightTheme) {
    return barStyle;
  }

  return barStyle === 'light-content' ? 'dark-content' : 'light-content';
}
