import { MainScreensNames } from '../names';

import TabBarMessages from './MainNavigator.messages';

import { IconName } from '$components/Icon/Icon.interface';

export const TAB_BAR_ICONS: {
  [key in MainScreensNames]?: {
    icon: IconName;
    messageKey: keyof typeof TabBarMessages;
  };
} = {
  [MainScreensNames.Main]: {
    icon: 'home',
    messageKey: 'main',
  },
  [MainScreensNames.UIKit]: {
    icon: 'menu',
    messageKey: 'uikit',
  },
  [MainScreensNames.Wallets]: {
    icon: 'wallet',
    messageKey: 'wallet',
  },
  [MainScreensNames.Swap]: {
    icon: 'exchange',
    messageKey: 'swap',
  },
  [MainScreensNames.Exchange]: {
    icon: 'candles',
    messageKey: 'exchange',
  },
  [MainScreensNames.Notifications]: {
    icon: 'bell',
    messageKey: 'notifications',
  },
  [MainScreensNames.Settings]: {
    icon: 'user',
    messageKey: 'settings',
  },
};
