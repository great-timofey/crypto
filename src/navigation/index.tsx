import React, { createRef, useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking, StyleSheet, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import { AuthNavigator } from './auth/AuthNavigator';
import MainNavigator from './main/MainNavigator';
import { AuthScreensNames, MainScreensNames } from './names';
import { navigationRef, parseUrl } from './utils';

import { AppDispatch } from '$redux/store';
import { appIsReadySelector, commonSelector, profileSelector } from '$redux/selectors';
import { authActions } from '$redux/auth/';
import { useAppState } from '$hooks/useAppState';
import { Toast, Splash, StatusBar, NoConnection } from '$components';

const AppStack = createStackNavigator();

const linkingUrlRef = createRef<any>();

Linking.addEventListener('url', (params) => {
  // @ts-ignore
  linkingUrlRef.current = parseUrl(params.url);
});

export function AppNavigator() {
  const { isLoggedIn } = useSelector(profileSelector);
  const appIsReady = useSelector(appIsReadySelector);
  const { fatalError } = useSelector(commonSelector);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const onRehydrate = useCallback(() => {
    if (linkingUrlRef?.current?.hash) {
      dispatch(authActions.setHash(linkingUrlRef.current.hash));
    }
  }, [dispatch]);

  useAppState(onRehydrate);

  const { isConnected } = useNetInfo();
  const [showNoConnection, setShowNoConnection] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoConnection(!isConnected);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isConnected]);

  useEffect(() => {
    const appReadyForUser = isLoggedIn ? appIsReady : true;
    if (!isConnected || appReadyForUser) {
      RNBootSplash.hide({ duration: 100 });
    }
  }, [isConnected, isLoggedIn, appIsReady]);

  const navigationTheme = {
    dark: theme.isCurrent('dark'),
    colors: {
      background: theme.colors.backgroundPrimary,
      primary: theme.colors.foregroundBlue,
      card: theme.colors.backgroundPrimary,
      text: theme.colors.backgroundPrimary,
      border: theme.colors.backgroundPrimary,
    },
  };

  const getConnectedScreens = () =>
    isLoggedIn && (!appIsReady || fatalError) ? (
      <View style={StyleSheet.absoluteFillObject}>
        <StatusBar backgroundColorKey="backgroundPrimary" />
        <Splash needLoadInitialData />
      </View>
    ) : (
      <AppStack.Navigator headerMode="none">
        {isLoggedIn ? (
          <AppStack.Screen name={MainScreensNames.Main} component={MainNavigator} />
        ) : (
          <AppStack.Screen name={AuthScreensNames.AuthStack} component={AuthNavigator} />
        )}
      </AppStack.Navigator>
    );

  return (
    <NavigationContainer theme={navigationTheme} ref={navigationRef}>
      {showNoConnection ? <NoConnection /> : getConnectedScreens()}
      <Toast />
    </NavigationContainer>
  );
}
