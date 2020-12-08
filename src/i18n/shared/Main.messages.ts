import { defineMessages } from 'react-intl';

const messages = {
  currency: {
    id: 'currency',
    defaultMessage: 'Currency',
  },
  cryptoCurrency: {
    id: 'cryptocurrency',
    defaultMessage: 'Crypto currency',
  },
  exchange: {
    id: 'exchange',
    defaultMessage: 'Exchange',
  },
  other: {
    id: 'other',
    defaultMessage: 'Other',
  },
  fastAction: {
    id: 'fastActions',
    defaultMessage: 'Fast Actions',
  },
  accountBalance: {
    id: 'accountBalance',
    defaultMessage: 'Account balance',
  },
  refillCurrency: {
    id: 'fastActions.refillCurrency',
    defaultMessage: 'Top up {currency}',
  },
  buyCrypto: {
    id: 'fastActions.buyCrypto',
    defaultMessage: 'Buy Crypto',
  },
  receiveCrypto: {
    id: 'fastActions.receiveCrypto',
    defaultMessage: 'Receive Crypto',
  },
  buyNarfexToken: {
    id: 'fastActions.buyNarfexToken',
    defaultMessage: 'Buy Narfex Token',
  },
};

export default defineMessages(messages);
