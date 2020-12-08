import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from 'react-native';
import { useTheme } from 'styled-components';
import { useSafeArea } from 'react-native-safe-area-context';
import { FormattedMessage } from 'react-intl';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useSelector } from 'react-redux';

import { TAB_BAR_ICONS } from './constants';
import * as S from './MainNavigator.styles';
import messages from './MainNavigator.messages';

import { BadgedButton } from '$components';
import { MainScreensNames } from '$navigation/names';
import { notificationsCountSelector } from '$redux/selectors';

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const theme = useTheme();
  const { bottom } = useSafeArea();
  const unreadCount = useSelector(notificationsCountSelector);

  try {
    changeNavigationBarColor(theme.colors.tabBar, theme.isCurrent('light'), false);
  } catch (e) {
    console.error(e);
  }

  //  index of swap tab apparently won't change so we can use it
  const routes = [
    ...state.routes.slice(0, 2),
    ('' as unknown) as Route,
    ...state.routes.slice(2),
  ];

  return (
    <S.TabBarContainerStyled bottom={bottom}>
      {routes.map((route, index) => {
        //  index of swap tab apparently won't change so we can use it
        if (index === 2) {
          return (
            <S.TabBarCircleButtonStyled
              activeOpacity={1}
              key={route.name || MainScreensNames.Swap}
              onPress={() => navigation?.navigate(MainScreensNames.SwapNavigator)}
            >
              <S.CircleIconStyled
                name="exchange"
                gradient={[theme.colors.darkBlue, theme.colors.primaryBlue]}
              />
            </S.TabBarCircleButtonStyled>
          );
        }

        const { options } = descriptors[route.key];

        //  since we added placeholder for central tab button we need to update indices
        const isFocused = (state.index < 2 ? state.index : state.index + 1) === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const { icon, messageKey } = TAB_BAR_ICONS[route.name];

        return (
          <S.TabBarButtonStyled
            key={icon}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            bottom={bottom}
          >
            <BadgedButton
              iconFill={
                isFocused ? theme.colors.foregroundBlue : theme.colors.foregroundTertiary
              }
              onPress={onPress}
              badgeContent={
                route.name === MainScreensNames.Notifications ? unreadCount : 0
              }
              iconName={icon}
            />
            <S.TabBarLabelStyled
              textProps={{ numberOfLines: 1 }}
              isFocused={isFocused}
              type="BodySmallText"
            >
              <FormattedMessage {...messages[messageKey]} />
            </S.TabBarLabelStyled>
          </S.TabBarButtonStyled>
        );
      })}
    </S.TabBarContainerStyled>
  );
};
