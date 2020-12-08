import { defineMessages } from 'react-intl';

const messages = {
  all: {
    id: 'all',
    defaultMessage: 'All',
  },
  transfers: {
    id: 'transfers',
    defaultMessage: 'Transfers',
  },
  security: {
    id: 'security',
    defaultMessage: 'security',
  },
  news: {
    id: 'news',
    defaultMessage: 'News',
  },
  notifications: {
    id: 'notifications',
    defaultMessage: 'Notifications',
  },
  notificationsEmpty: {
    id: 'notifications.empty',
    defaultMessage: 'Your notifications appears here',
  },
  receivedFromAddress: {
    id: 'notifications.receivedFromAddress',
    defaultMessage: 'Received from address {address}',
  },
  transfer: {
    id: 'notifications.transfer',
    defaultMessage: 'Transfer',
  },
  fiatExchange: {
    id: 'notifications.fiatExchange',
    defaultMessage: 'Fiat exchange',
  },
  transaction: {
    id: 'notifications.transaction',
    defaultMessage: 'Transaction',
  },
};

export default defineMessages(messages);
