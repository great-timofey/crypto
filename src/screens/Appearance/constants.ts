import { ThemesEnum } from '$global/theme';

export const THEMES: {
  name: ThemesEnum;
  message: {
    id: string;
    defaultMessage: string;
  };
}[] = [
  {
    name: ThemesEnum.light,
    message: {
      id: 'theme.light',
      defaultMessage: 'Light',
    },
  },
  {
    name: ThemesEnum.dark,
    message: {
      id: 'theme.dark',
      defaultMessage: 'Dark',
    },
  },
];
