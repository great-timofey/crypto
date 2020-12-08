import { defineMessages } from 'react-intl';

const messages = {
  pending: {
    id: 'status.pending',
    defaultMessage: 'Pending',
  },
  failed: {
    id: 'status.failed',
    defaultMessage: 'Failed',
  },
  confirmation: {
    id: 'status.confirmation',
    defaultMessage: 'Confirmation',
  },
  confirmed: {
    id: 'status.confirmed',
    defaultMessage: 'Confirmed',
  },
  unconfirmed: {
    id: 'status.unconfirmed',
    defaultMessage: 'Unconfirmed',
  },
  canceled: {
    id: 'status.canceled',
    defaultMessage: 'Canceled',
  },
  done: {
    id: 'status.done',
    defaultMessage: 'Done',
  },
};

export default defineMessages(messages);
