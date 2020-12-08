import { defineMessages } from 'react-intl';

const messages = {
  transferReceiveTitle: {
    id: 'historyItem.transferReceiveTitle',
    defaultMessage: 'Receipt of funds',
  },
  transferReceiveInfo: {
    id: 'historyItem.transferReceiveInfo',
    defaultMessage: 'Received from address {address}',
  },

  transactionReceiveTitle: {
    id: 'historyItem.transactionReceiveTitle',
    defaultMessage: 'Receipt of funds',
  },
  transactionReceiveInfo: {
    id: 'historyItem.transactionReceiveInfo',
    defaultMessage: 'Received from user {user}',
  },

  userAuthorizeTitle: {
    id: 'historyItem.userAuthorizeTitle',
    defaultMessage: 'Login from a new device',
  },
  userAuthorizeInfo: {
    id: 'historyItem.userAuthorizeInfo',
    defaultMessage: '{device}. If you did not perform this action, contact support.',
  },
  poolApproved: {
    id: 'historyItem.poolApproved',
    defaultMessage: 'Pool approved',
  },
  refillTitle: {
    id: 'historyItem.refillTitle',
    defaultMessage: 'Currency account replenishment',
  },
  refillInfo: {
    id: 'historyItem.refillInfo',
    defaultMessage: '{bankCode} Bank transfer',
  },
  withdrawalTitle: {
    id: 'historyItem.withdrawalTitle',
    defaultMessage: 'Withdrawal',
  },
  withdrawalInfo: {
    id: 'historyItem.withdrawalInfo',
    defaultMessage: 'Withdrawal of {amount} rubles to {bank} account. Fee: {fee}',
  },
  swapTitle: {
    id: 'historyItem.swapTitle',
    defaultMessage: 'Currency exchange',
  },
  swapInfo: {
    id: 'historyItem.swapInfo',
    defaultMessage: 'Given {amount}',
  },
  transactionSendTitle: {
    id: 'historyItem.transactionSendTitle',
    defaultMessage: 'Sending funds',
  },
  transactionSendInfo: {
    id: 'historyItem.transactionSendTitle',
    defaultMessage: 'Send to {address}',
  },
  transferSendTitle: {
    id: 'historyItem.transferSendTitle',
    defaultMessage: 'Sending funds',
  },
  transferSendInfo: {
    id: 'historyItem.transferSendInfo',
    defaultMessage: 'Send to {user}',
  },
  buyTokenTitle: {
    id: 'historyItem.buyTokenTitle',
    defaultMessage: 'Buy Token',
  },
  buyTokenInfo: {
    id: 'historyItem.buyTokenInfo',
    defaultMessage: 'Given {amount}',
  },
  unknownDevice: {
    id: 'historyItem.unknownDevice',
    defaultMessage: 'Unknown device',
  },
  couldNotLoadData: {
    id: 'historyItem.couldNotLoadData',
    defaultMessage: 'Could not load data.',
  },
  tryAgain: {
    id: 'historyItem.tryAgain',
    defaultMessage: 'Try again',
  },
  bankCardRefillReject: {
    id: 'historyItem.bankCardRefillReject',
    defaultMessage: 'Refill from the card is rejected',
  },
};

export default defineMessages(messages);
