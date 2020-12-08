import 'react-native-gesture-handler';
import 'intl';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/locale-data/ru';
import '@formatjs/intl-relativetimeformat/dist/locale-data/en';
import '@formatjs/intl-unified-numberformat/polyfill';
import '@formatjs/intl-unified-numberformat/dist/locale-data/ru';
import '@formatjs/intl-unified-numberformat/dist/locale-data/en';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { ThemeProvider } from 'styled-components';
import { createIntl, IntlProvider } from 'react-intl';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { getStore } from './redux';
import { AppNavigator } from './navigation';
import { navigationMountedRef } from './navigation/utils';

import { globalIntlInstance, globalIntlInstanceCache } from '$i18n/globalIntl';
import { profileSelector } from '$redux/selectors';
import { DarkTheme, LightTheme, NarfexTheme, ThemesEnum } from '$global/theme';
import { LOCALES } from '$i18n';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

const { appStore, persistor } = getStore();

const App: React.FC = () => {
  useEffect(() => {
    //  @ts-ignore
    navigationMountedRef.current = true;

    return () => {
      //  @ts-ignore
      navigationMountedRef.current = false;
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={appStore}>
        <PersistGate persistor={persistor} loading={null}>
          <LocaleThemeProviderComponent />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

function LocaleThemeProviderComponent() {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState<NarfexTheme>(
    colorScheme === 'light' || colorScheme === 'no-preference' ? LightTheme : DarkTheme,
  );

  const { locale: currentLocale, theme: currentTheme, themeAuto } = useSelector(
    profileSelector,
  );

  useEffect(() => {
    // @ts-ignore
    globalIntlInstance.current = createIntl(
      {
        locale: currentLocale,
        messages: LOCALES[currentLocale],
      },
      globalIntlInstanceCache,
    );
  }, [currentLocale]);

  useEffect(() => {
    if (themeAuto) {
      setTheme(
        colorScheme === 'light' || colorScheme === 'no-preference'
          ? LightTheme
          : DarkTheme,
      );
    } else {
      setTheme(currentTheme === ThemesEnum.light ? LightTheme : DarkTheme);
    }
  }, [currentTheme, themeAuto, colorScheme]);

  try {
    changeNavigationBarColor(theme.colors.tabBar, theme.isCurrent('light'), false);
  } catch (e) {
    console.log(e);
  }

  return (
    <AppearanceProvider>
      <IntlProvider locale={currentLocale} messages={LOCALES[currentLocale]}>
        <ThemeProvider theme={theme}>
          <AppNavigator />
        </ThemeProvider>
      </IntlProvider>
    </AppearanceProvider>
  );
}
