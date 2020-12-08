import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { MainScreensNames } from '../names';

import { BankListType } from '$screens/BankList/BankList.interface';
import { HistoryListItem } from '$components/HistoryList/HistoryList.interface';

type ScreenWithHideableTabBar = { tabBarVisible?: boolean };
type ScreenWithValidation = { disableConfirmation?: boolean };

export type MainNavigatorParamsList = {
  [MainScreensNames.UIKit]: ScreenWithHideableTabBar;
  [MainScreensNames.Main]: ScreenWithHideableTabBar;
  [MainScreensNames.MainNavigator]: undefined;
  [MainScreensNames.SwapNavigator]: undefined;
  [MainScreensNames.Swap]: undefined;
  [MainScreensNames.SwapSuccess]: undefined;
  [MainScreensNames.SwapRate]: undefined;
  [MainScreensNames.SwapInsufficientFunds]: undefined;
  [MainScreensNames.BankNavigator]: undefined;
  [MainScreensNames.WalletsNavigator]: undefined;
  [MainScreensNames.BankList]: {
    type: BankListType.refill | BankListType.withdraw;
    resetToRoot?: boolean;
  };
  [MainScreensNames.BankMethodList]: undefined;
  [MainScreensNames.FiatWithdrawRecipient]: undefined;
  [MainScreensNames.Exchange]: undefined;
  [MainScreensNames.Wallets]: ScreenWithHideableTabBar;
  [MainScreensNames.Notifications]: ScreenWithHideableTabBar;
  [MainScreensNames.CurrencySend]: ScreenWithHideableTabBar;
  [MainScreensNames.CurrencyReceive]: ScreenWithHideableTabBar & { fullScreen?: boolean };
  [MainScreensNames.FiatRefill]: ScreenWithHideableTabBar;
  [MainScreensNames.FiatWithdrawal]: ScreenWithHideableTabBar;
  [MainScreensNames.Settings]: ScreenWithHideableTabBar;
  [MainScreensNames.Personal]: ScreenWithHideableTabBar;
  [MainScreensNames.PersonalLogin]: ScreenWithHideableTabBar;
  [MainScreensNames.PersonalEmail]: ScreenWithHideableTabBar;
  [MainScreensNames.Appearance]: ScreenWithHideableTabBar;
  [MainScreensNames.SecureGateNavigator]: undefined;
  [MainScreensNames.PincodeValidate]: ScreenWithValidation;
  [MainScreensNames.BiometricsValidate]: ScreenWithValidation;
  [MainScreensNames.SetPincode]: ScreenWithHideableTabBar;
  [MainScreensNames.BiometricsPincodeSettings]: undefined;
  [MainScreensNames.SecureGate]: undefined;
  [MainScreensNames.Language]: ScreenWithHideableTabBar;
  [MainScreensNames.Wallet]: ScreenWithHideableTabBar;
  [MainScreensNames.HistoryItem]: ScreenWithHideableTabBar & { item: HistoryListItem };
};

export type MainScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.Main
>;

export type CurrencySendScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.CurrencySend
>;

export type CurrencyReceiveScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.CurrencyReceive
>;

export type CurrencyReceiveScreenRouteProp = RouteProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.CurrencyReceive
>;

export type WalletsScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.Wallets
>;

export type WalletScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.Wallet
>;

export type HistoryItemScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.HistoryItem
>;

export type HistoryItemScreenRouteProp = RouteProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.HistoryItem
>;

export type NotificationsScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.Notifications
>;

export type SettingsScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.Settings
>;

export type PersonalScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.Personal
>;

export type PersonalLoginScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.PersonalLogin
>;

export type PersonalEmailScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.PersonalEmail
>;

export type SwapUINavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.Swap
>;

export type SwapInsufficientFundsNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.SwapInsufficientFunds
>;

export type SwapRateNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.SwapRate
>;

export type PincodeValidateNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.PincodeValidate
>;

export type PincodeValidateScreenRouteProp = RouteProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.PincodeValidate
>;

export type BiometricsValidateNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.BiometricsValidate
>;

export type SetPincodeNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.SetPincode
>;

export type BiometricsPincodeSettingsNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.BiometricsPincodeSettings
>;

export type SecureGateNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.SecureGate
>;

export type FiatWithdrawalNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.FiatWithdrawal
>;

export type FiatRefillNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.FiatRefill
>;

export type BankListNavigationProp = StackNavigationProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.BankList
>;

export type BankListScreenRouteProp = RouteProp<
  MainNavigatorParamsList,
  typeof MainScreensNames.BankList
>;
