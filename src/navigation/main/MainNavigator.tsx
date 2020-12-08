import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { TransitionPreset } from '@react-navigation/stack/lib/typescript/src/types';

import { MainScreensNames } from '../names';

import { MainNavigatorParamsList } from './MainNavigator.interface';
import { TabBar } from './TabBar';

import {
  Appearance,
  BankList,
  BankMethod,
  BankMethodList,
  BiometricsPincodeSettings,
  BiometricsValidate,
  CurrencyReceive,
  CurrencySend,
  CurrencySendSuccess,
  FiatRefill,
  FiatWithdrawal,
  FiatWithdrawConfirm,
  FiatWithdrawRecipient,
  Language,
  Main,
  Notifications,
  Personal,
  PincodeValidate,
  SecureGate,
  SetPincode,
  Settings,
  SwapInsufficientFunds,
  SwapRate,
  SwapSuccess,
  Swap,
  UIKit,
  Wallet,
  Wallets,
  PersonalLogin,
  PersonalEmail,
  HistoryItem,
} from '$screens';
import { BankListType } from '$screens/BankList/BankList.interface';
import { DEVICE_WIDTH } from '$global/device';

const Tab = createBottomTabNavigator<MainNavigatorParamsList>();
const Stack = createStackNavigator();

const DISABLED_BOTTOM_TAB_NAVIGATOR_SCREENS = [
  MainScreensNames.CurrencySend,
  MainScreensNames.CurrencySendSuccess,
  MainScreensNames.FiatRefill,
  MainScreensNames.FiatWithdrawal,
  MainScreensNames.FiatWithdrawRecipient,
  MainScreensNames.FiatWithdrawConfirm,
  MainScreensNames.SetPincode,
  MainScreensNames.PersonalLogin,
  MainScreensNames.PersonalEmail,
];

const defaultScreenOptions = {
  gestureResponseDistance: {
    horizontal: DEVICE_WIDTH,
  },
};

const MainStackNavigator = () => (
  <Stack.Navigator
    screenOptions={defaultScreenOptions}
    headerMode="none"
    initialRouteName={MainScreensNames.Main}
  >
    <Stack.Screen name={MainScreensNames.Main} component={Main} />
  </Stack.Navigator>
);

const NotificationsStackNavigator = () => (
  <Stack.Navigator
    screenOptions={defaultScreenOptions}
    headerMode="none"
    initialRouteName={MainScreensNames.Notifications}
  >
    <Stack.Screen name={MainScreensNames.Notifications} component={Notifications} />
    <Stack.Screen name={MainScreensNames.HistoryItem} component={HistoryItem} />
  </Stack.Navigator>
);

const BankStackNavigator = () => (
  <Stack.Navigator
    headerMode="none"
    initialRouteName={MainScreensNames.BankList}
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen
      name={MainScreensNames.BankList}
      initialParams={{ type: BankListType.refill }}
      component={BankList}
    />
    <Stack.Screen name={MainScreensNames.BankMethodList} component={BankMethodList} />
    <Stack.Screen name={MainScreensNames.BankMethod} component={BankMethod} />
  </Stack.Navigator>
);

const WalletsStackNavigator = () => (
  <Stack.Navigator
    headerMode="none"
    initialRouteName={MainScreensNames.Wallets}
    screenOptions={defaultScreenOptions}
  >
    <Stack.Screen name={MainScreensNames.Wallets} component={Wallets} />
    <Stack.Screen name={MainScreensNames.Wallet} component={Wallet} />
    <Stack.Screen name={MainScreensNames.HistoryItem} component={HistoryItem} />
    <Stack.Screen name={MainScreensNames.CurrencySend} component={CurrencySend} />
    <Stack.Screen
      name={MainScreensNames.CurrencySendSuccess}
      component={CurrencySendSuccess}
    />
    <Stack.Screen name={MainScreensNames.CurrencyReceive} component={CurrencyReceive} />
    <Stack.Screen name={MainScreensNames.FiatRefill} component={FiatRefill} />
    <Stack.Screen name={MainScreensNames.BankList} component={BankList} />
    <Stack.Screen name={MainScreensNames.BankMethodList} component={BankMethodList} />
    <Stack.Screen name={MainScreensNames.BankMethod} component={BankMethod} />
    <Stack.Screen name={MainScreensNames.FiatWithdrawal} component={FiatWithdrawal} />
    <Stack.Screen
      name={MainScreensNames.FiatWithdrawRecipient}
      component={FiatWithdrawRecipient}
    />
    <Stack.Screen
      name={MainScreensNames.FiatWithdrawConfirm}
      component={FiatWithdrawConfirm}
    />
  </Stack.Navigator>
);

const swapNavigatorOptions: Pick<
  TransitionPreset,
  'gestureDirection' | 'cardStyleInterpolator'
> = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const SwapNavigator = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={defaultScreenOptions}
      initialRouteName={MainScreensNames.Swap}
    >
      <Stack.Screen
        name={MainScreensNames.Swap}
        component={Swap}
        options={swapNavigatorOptions}
      />
      <Stack.Screen
        name={MainScreensNames.SwapRate}
        component={SwapRate}
        options={swapNavigatorOptions}
      />
      <Stack.Screen
        name={MainScreensNames.SwapInsufficientFunds}
        component={SwapInsufficientFunds}
        options={swapNavigatorOptions}
      />
      <Stack.Screen
        name={MainScreensNames.SwapSuccess}
        component={SwapSuccess}
        options={swapNavigatorOptions}
      />
      <Stack.Screen name={MainScreensNames.CurrencyReceive} component={CurrencyReceive} />
    </Stack.Navigator>
  );
};

const SettingsStackNavigator = () => (
  <Stack.Navigator
    screenOptions={defaultScreenOptions}
    headerMode="none"
    initialRouteName={MainScreensNames.Settings}
  >
    <Stack.Screen name={MainScreensNames.Settings} component={Settings} />
    <Stack.Screen name={MainScreensNames.UIKit} component={UIKit} />
    <Stack.Screen name={MainScreensNames.Language} component={Language} />
    <Stack.Screen name={MainScreensNames.Appearance} component={Appearance} />
    <Stack.Screen name={MainScreensNames.Personal} component={Personal} />
    <Stack.Screen
      name={MainScreensNames.BiometricsPincodeSettings}
      component={BiometricsPincodeSettings}
    />
    <Stack.Screen name={MainScreensNames.SetPincode} component={SetPincode} />
    <Stack.Screen name={MainScreensNames.PersonalLogin} component={PersonalLogin} />
    <Stack.Screen name={MainScreensNames.PersonalEmail} component={PersonalEmail} />
  </Stack.Navigator>
);

const tabOptions = ({ route }: { route: any }) => {
  //  TODO: fix types issue
  //  @ts-ignore
  const routeName = route.state?.routes[route.state?.index]?.name;
  //  @ts-ignore
  const routeParams = route.state?.routes[route.state?.index]?.params;
  return {
    tabBarVisible:
      routeParams?.tabBarVisible ??
      !DISABLED_BOTTOM_TAB_NAVIGATOR_SCREENS.includes(routeName),
  };
};

const MainNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name={MainScreensNames.Main} component={MainStackNavigator} />
      <Tab.Screen
        name={MainScreensNames.Wallets}
        component={WalletsStackNavigator}
        options={tabOptions}
      />
      <Tab.Screen
        name={MainScreensNames.Notifications}
        component={NotificationsStackNavigator}
      />
      <Tab.Screen
        name={MainScreensNames.Settings}
        options={tabOptions}
        component={SettingsStackNavigator}
      />
    </Tab.Navigator>
  );
};

const SecureGateNavigator = () => (
  <Stack.Navigator
    screenOptions={{ ...defaultScreenOptions, gestureEnabled: false }}
    headerMode="none"
  >
    <Stack.Screen name={MainScreensNames.SecureGate} component={SecureGate} />
    <Stack.Screen
      name={MainScreensNames.BiometricsValidate}
      component={BiometricsValidate}
    />
    <Stack.Screen name={MainScreensNames.PincodeValidate} component={PincodeValidate} />
  </Stack.Navigator>
);

const RootNavigator = () => (
  <Stack.Navigator
    mode="modal"
    headerMode="none"
    initialRouteName={MainScreensNames.SecureGateNavigator}
  >
    <Stack.Screen
      name={MainScreensNames.SecureGateNavigator}
      component={SecureGateNavigator}
      options={{
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}
    />
    <Stack.Screen
      name={MainScreensNames.MainNavigator}
      component={MainNavigator}
      options={{ gestureEnabled: false }}
    />
    <Stack.Screen name={MainScreensNames.SwapNavigator} component={SwapNavigator} />
    <Stack.Screen
      name={MainScreensNames.WalletsNavigator}
      component={WalletsStackNavigator}
    />
    <Stack.Screen
      name={MainScreensNames.BankNavigator}
      component={BankStackNavigator}
      options={{
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
