import { CONSTANT_COLORS, DARK_COLORS, FEEDBACK_COLORS, LIGHT_COLORS } from './colors';

type ThemeSpecificColor = keyof typeof LIGHT_COLORS;
type ConstantColor = keyof typeof CONSTANT_COLORS;
type FeedbackColor = keyof typeof FEEDBACK_COLORS;

export type NarfexThemeColor = ThemeSpecificColor | ConstantColor | FeedbackColor;

export enum ThemesEnum {
  light = 'light',
  dark = 'dark',
}

export type Theme = keyof typeof ThemesEnum;

export const LightTheme = {
  isCurrent: (themeName: Theme) => themeName === ThemesEnum.light,
  colors: {
    ...LIGHT_COLORS,
    ...CONSTANT_COLORS,
    ...FEEDBACK_COLORS,
  },
};

export const DarkTheme = {
  isCurrent: (themeName: Theme) => themeName === ThemesEnum.dark,
  colors: {
    ...DARK_COLORS,
    ...CONSTANT_COLORS,
    ...FEEDBACK_COLORS,
  },
};

export type NarfexTheme = {
  isCurrent: (themeName: Theme) => boolean;
  colors: {
    [key in NarfexThemeColor]: string;
  };
};
