import React, { useCallback, FC, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import * as S from './Notifications.styles';
import { NotificationTab } from './NotificationTab/NotificationTab';

import { setUnreadCount } from '$redux/notifications';
import notificationMessages from '$i18n/shared/notifications.messages';
import { StatusBar, Navbar } from '$components';
import { NotificationsScreenNavigationProp } from '$navigation/main/MainNavigator.interface';
import { darkenStatusBar, lightenStatusBar } from '$global/statusBar';

type NotificationsProps = {
  navigation: NotificationsScreenNavigationProp;
};

export const Notifications: FC<NotificationsProps> = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUnreadCount(0));
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        darkenStatusBar();
      } else {
        lightenStatusBar();
      }
    }, [theme]),
  );

  return (
    <>
      <S.NotificationsContainerStyled>
        <StatusBar />
        <Navbar>
          <FormattedMessage {...notificationMessages.notifications} />
        </Navbar>
        <NotificationTab />
        {/*<Tab.Navigator*/}
        {/*  tabBarOptions={{*/}
        {/*    style: {*/}
        {/*      backgroundColor: theme.colors.backgroundPrimary,*/}
        {/*      borderBottomColor: theme.colors.foregroundQuaternary,*/}
        {/*      borderBottomWidth: 0.5,*/}
        {/*      height: 40,*/}
        {/*      alignItems: 'center',*/}
        {/*    },*/}
        {/*    contentContainerStyle: {*/}
        {/*      alignItems: 'center',*/}
        {/*    },*/}
        {/*    tabStyle: { width: 'auto' },*/}
        {/*    scrollEnabled: true,*/}
        {/*    renderIndicator: () => <></>,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {NOTIFICATION_TABS.map((tab) => (*/}
        {/*    <Tab.Screen*/}
        {/*      key={tab.key}*/}
        {/*      options={{*/}
        {/*        tabBarLabel: ({ focused }) => (*/}
        {/*          <>*/}
        {/*            <S.NotificationsBarLabelStyled focused={focused} type="HeadingsSB6">*/}
        {/*              <FormattedMessage {...notificationMessages[tab.type]} />*/}
        {/*            </S.NotificationsBarLabelStyled>*/}
        {/*            {focused ? <S.NotificationsBarIndicatorStyled /> : <></>}*/}
        {/*          </>*/}
        {/*        ),*/}
        {/*      }}*/}
        {/*      name={tab.type}*/}
        {/*      component={NotificationTab}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</Tab.Navigator>*/}
      </S.NotificationsContainerStyled>
    </>
  );
};
