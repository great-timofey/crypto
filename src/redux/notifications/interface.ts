import { Paginate } from '$global/types';
import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';

export type Notification = {
  id: number;
  title: '' | null;
  message: '' | null;
  type: HistoryListTypeEnum;
  createdAt: number;
  unread: boolean;
  important: boolean;
  icon: string;
  actions: [];
  data: Record<string, any>;
};

export type NotificationState = {
  error: boolean;
  loading: boolean;
  refreshing: boolean;
  unreadCount: number;
  notifications: Paginate<Notification>;
};
