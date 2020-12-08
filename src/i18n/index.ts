import ruLocale from './locales/ru.json';
import enLocale from './locales/en.json';

export const LOCALES = {
  en: enLocale,
  ru: ruLocale,
};

export type Locale = keyof typeof LOCALES;
