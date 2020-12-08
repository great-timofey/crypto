import { createRef } from 'react';
import { createIntl, createIntlCache, IntlShape } from 'react-intl';

import enLocale from '$i18n/locales/en.json';

export const globalIntlInstance = createRef<IntlShape>();
export const globalIntlInstanceCache = createIntlCache();

//  default locale
const intl = createIntl(
  {
    locale: 'en',
    messages: enLocale,
  },
  globalIntlInstanceCache,
);

// @ts-ignore
globalIntlInstance.current = intl;

export function getGlobalIntl() {
  return globalIntlInstance.current;
}
