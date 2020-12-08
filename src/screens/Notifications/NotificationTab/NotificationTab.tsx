import React, { FC, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './NotificationTab.styles';

import notificationMessages from '$i18n/shared/notifications.messages';
import { HistoryList } from '$components';
import { prepareHistoryItemsToDisplay } from '$global/historyItems/utils';
import {
  loadNotificationRequest,
  refreshNotificationRequest,
} from '$redux/notifications/index';
import { notificationsSelector } from '$redux/selectors';
import { BOTTOM_TAB_BAR_HEIGHT } from '$global/constants';

export const NotificationTab: FC = () => {
  const { bottom } = useSafeArea();
  const { notifications: stateNotifications, error, loading, refreshing } = useSelector(
    notificationsSelector,
  );
  const dispatch = useDispatch();
  const intl = useIntl();

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 300);
  }, []);

  const paginationOver = (stateNotifications?.next ?? null) === null;

  const handleRefresh = () => {
    dispatch(refreshNotificationRequest());
  };

  useEffect(() => {
    if (!stateNotifications?.items?.length) {
      dispatch(loadNotificationRequest());
    }
  }, [dispatch, stateNotifications]);

  const notifications = useMemo(
    () =>
      prepareHistoryItemsToDisplay(
        stateNotifications?.items?.map((item) => ({
          ...item.data,
          type: item.type,
          id: item.id,
          createdAt: item.createdAt,
          highlight: item.unread,
          isNotification: true,
        })),
        intl,
      ),
    [stateNotifications, intl],
  );

  const handleEndReached = () => {
    !loading && !paginationOver && dispatch(loadNotificationRequest());
  };

  return (
    <S.NotificationTabStyled>
      <HistoryList
        loading={showLoader || loading}
        paginationOver={paginationOver}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        loadingError={error}
        onEndReached={handleEndReached}
        items={notifications}
        emptyIcon="05"
        emptyText={<FormattedMessage {...notificationMessages.notificationsEmpty} />}
        emptyStyle={{
          marginBottom: bottom + BOTTOM_TAB_BAR_HEIGHT,
        }}
      />
    </S.NotificationTabStyled>
  );
};
