import { defineMessages } from 'react-intl';

const messages = {
  currencySwap: {
    id: 'swap.currencySwap',
    defaultMessage: 'Currency Swap',
  },
  overallAvailable: {
    id: 'swap.overallAvailable',
    defaultMessage: 'Available = {availableAmount}',
  },
  insertMaxAmount: {
    id: 'swap.insertMaxAmount',
    defaultMessage: 'Insert Max Amount {overallAmount}',
  },
  toSwapRate: {
    id: 'swap.toSwapRate',
    defaultMessage: 'To Swap Rate',
  },
  chooseCurrencies: {
    id: 'swap.chooseCurrencies',
    defaultMessage: 'Choose currencies',
  },
  give: {
    id: 'swap.give',
    defaultMessage: 'Give',
  },
  receive: {
    id: 'swap.receive',
    defaultMessage: 'Buy',
  },
  swapTo: {
    id: 'swap.swapTo',
    defaultMessage: 'Swap to {swapAmount}',
  },
  insufficientFunds: {
    id: 'swap.insufficientFunds',
    defaultMessage: 'Insufficient funds',
  },
  insufficientFundsDetails: {
    id: 'swap.insufficientFundsDetails',
    defaultMessage: 'Insufficient funds {giveAmount} to receive {receiveAmount}',
  },
  replenish: {
    id: 'swap.replenish',
    defaultMessage: 'Replenish {currency} ›',
  },
  receiveCryptocurrency: {
    id: 'swap.receiveCryptocurrency',
    defaultMessage: 'Receive {cryptocurrency} ›',
  },
  purchaseSuccess: {
    id: 'swap.purchaseSuccess',
    defaultMessage: 'Purchase has been successfull',
  },
  purchaseDetails: {
    id: 'swap.purchaseDetails',
    defaultMessage: 'Purchase details',
  },
  toWallet: {
    id: 'swap.toWallet',
    defaultMessage: 'To wallet ›',
  },
};

export default defineMessages(messages);
