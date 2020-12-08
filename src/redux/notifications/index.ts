import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NotificationState } from './interface';

export const notificationsReducerName = 'notifications';

const initialState: NotificationState = {
  error: false,
  loading: false,
  refreshing: false,
  unreadCount: 0,
  notifications: {
    items: [],
    next: '0',
  },
};

const notifications = createSlice({
  name: notificationsReducerName,
  initialState,
  reducers: {
    loadNotificationRequest() {},
    refreshNotificationRequest: (state) => {
      state.notifications.next = initialState.notifications.next;
    },
    setLoadingNotifications: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      state.notifications.items.forEach((n) => {
        n.unread = action.payload === n.id ? false : n.unread;
      });
    },
    setLoadingError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setRefreshingNotifications: (state, action: PayloadAction<boolean>) => {
      state.refreshing = action.payload;
    },
    loadUnreadCountRequest() {},
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    setNotifications(state, action: PayloadAction<NotificationState['notifications']>) {
      state.notifications.items = action.payload.items;
      state.notifications.next = action.payload.next;
    },
    addNotifications(state, action: PayloadAction<NotificationState['notifications']>) {
      state.notifications.items = [...state.notifications.items, ...action.payload.items];
      state.notifications.next = action.payload.next;
    },
    clearNotification: () => initialState,
  },
});

export const notificationsReducer = notifications.reducer;

export const {
  setLoadingError,
  setLoadingNotifications,
  setRefreshingNotifications,
  loadUnreadCountRequest,
  setUnreadCount,
  setNotifications,
  addNotifications,
  loadNotificationRequest,
  refreshNotificationRequest,
  clearNotification,
  markAsRead,
} = notifications.actions;
