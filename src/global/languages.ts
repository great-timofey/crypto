import { Locale } from '$i18n';
import { IconName } from '$components/Icon/Icon.interface';

export interface Language {
  icon: IconName;
  name: string;
  description: string;
}

type Languages = {
  [key in Locale]: Language;
};

export const LANGUAGES: Languages = {
  en: {
    icon: 'flag-en',
    name: 'English',
    description: 'English',
  },
  ru: {
    icon: 'flag-ru',
    name: 'Russian',
    description: 'Русский',
  },
  // id: {
  //   name: 'Indonesian',
  //   description: "Bahasa Indonesia",
  // },
};
