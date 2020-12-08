import { defineMessages } from 'react-intl';

const messages = {
  amount: {
    id: 'amount',
    defaultMessage: 'Amount',
  },
  next: {
    id: 'next',
    defaultMessage: 'Next',
  },
  currencies: {
    id: 'currencies',
    defaultMessage: 'Currencies',
  },
  cryptocurrencies: {
    id: 'cryptocurrencies',
    defaultMessage: 'Cryptocurrencies',
  },
  cryptocurrencyWallet: {
    id: 'cryptocurrencyWallet',
    defaultMessage: 'Cryptocurrency wallet',
  },
  currencyAccount: {
    id: 'currencyAccount',
    defaultMessage: 'Currency Account',
  },
  addCurrencyWalletPlus: {
    id: 'addCurrencyWalletPlus',
    defaultMessage: 'Add currency wallet',
  },
  addCryptocurrency: {
    id: 'currency.addCryptocurrency',
    defaultMessage: 'Add cryptocurrency wallet',
  },
  addCurrencyAccountPlus: {
    id: 'addCurrencyAccountPlus',
    defaultMessage: 'Add currency account +',
  },
  addCurrencyAccount: {
    id: 'currency.addCurrencyAccount',
    defaultMessage: 'Add currency account',
  },
  usdDollar: {
    id: 'usdDollar',
    defaultMessage: 'Dollar USA',
  },
  indonesianRupiah: {
    id: 'indonesianRupiah',
    defaultMessage: 'Indonesian rupiah',
  },
  history: {
    id: 'history',
    defaultMessage: 'History',
  },
  currencyHistoryEmpty: {
    id: 'currencyHistoryEmpty',
    defaultMessage: 'History of your operations with {currency} appears here',
  },
  send: {
    id: 'send',
    defaultMessage: 'Send',
  },
  receive: {
    id: 'receive',
    defaultMessage: 'Receive',
  },
  receiveCurrency: {
    id: 'receiveCurrency',
    defaultMessage: 'Receive {currency}',
  },
  sendCurrency: {
    id: 'sendCurrency',
    defaultMessage: 'Send {currency}',
  },
  blockchain: {
    id: 'blockchain',
    defaultMessage: 'Blockchain',
  },
  addressCopiedToClipboard: {
    id: 'addressCopiedToClipboard',
    defaultMessage: 'Address copied to clipboard',
  },
  loginCopiedToClipboard: {
    id: 'loginCopiedToClipboard',
    defaultMessage: 'Login copied to clipboard',
  },
  accountNumberCopiedToClipboard: {
    id: 'accountNumberCopiedToClipboard',
    defaultMessage: 'Account number copied to clipboard',
  },
  narfexUsersAbleToSendYouCurrencyByLogin: {
    id: 'narfexUsersAbleToSendYouCurrencyByLogin',
    defaultMessage: 'Narfex users able to send you {currency} by your login',
  },
  buyCurrencyProfitably: {
    id: 'buyCurrencyProfitably',
    defaultMessage: 'Buy {currency} at a profitable price',
  },
  walletAddressForBlockchainTransfer: {
    id: 'walletAddressForBlockchainTransfer',
    defaultMessage: 'Your wallet address {currency} for transfer using blockchain',
  },
  currencyOnlyReceiveWarningShort: {
    id: 'currencyOnlyReceiveWarningShort',
    defaultMessage:
      'By this address you can receive {currency} only, if user would send another currency (e.g {otherCurrency}), it may be lost',
  },
  currencyOnlyReceiveWarningLong: {
    id: 'currencyOnlyReceiveWarningLong',
    defaultMessage:
      'Pay attention to address you receive currency. If you would send currency to wrong address (e.g. Bitcoin to Bitcoin Cash address, or Ethereum to Ethereum Classic address), it may be lost',
  },
  sendAmountCurrency: {
    id: 'sendAmountCurrency',
    defaultMessage: 'Send {amount} {currency}',
  },
  transferCurrencyWithoutFee: {
    id: 'transferCurrencyWithoutFee',
    defaultMessage: 'Transfer {currency} without fee by using our platform',
  },
  enterNarfexUserLoginForCurrencySend: {
    id: 'enterNarfexUserLoginForCurrencySend',
    defaultMessage: 'Enter login or email of Narfex user to send {currency}',
  },
  enterAddressOfRecipient: {
    id: 'enterAddressOfRecipient',
    defaultMessage:
      'Enter address of recipient in blockchain, fee for transfer is charged',
  },
  equalsToUSD: {
    id: 'equalsToUSD',
    defaultMessage:
      'Equals to USD according to current exchange rate: 1 {currency} = {usdAmount} USD',
  },
  feeInCurrency: {
    id: 'feeInCurrency',
    defaultMessage: 'Fee: {fee}',
  },
  transferRecipient: {
    id: 'transferRecipient',
    defaultMessage: 'Transfer recipient',
  },
  recipientAddress: {
    id: 'recipientAddres',
    defaultMessage: 'Recipient address',
  },
  fee: {
    id: 'fee',
    defaultMessage: 'Fee',
  },
  feeFree: {
    id: 'feeFree',
    defaultMessage: 'Fee free',
  },
  sum: {
    id: 'sum',
    defaultMessage: 'Sum',
  },
  transferSent: {
    id: 'transferSent',
    defaultMessage: 'Transfer has been sent',
  },
  transactionDetails: {
    id: 'transactionDetails',
    defaultMessage: 'Transaction details',
  },
  toWallet: {
    id: 'toWallet',
    defaultMessage: 'To wallet ›',
  },
  usd: {
    id: 'usd',
    defaultMessage: 'Dollar USA',
  },
  eur: {
    id: 'eur',
    defaultMessage: 'Euro',
  },
  rub: {
    id: 'rub',
    defaultMessage: 'Ruble',
  },
  gbp: {
    id: 'gbp',
    defaultMessage: 'British Pound',
  },
  idr: {
    id: 'idr',
    defaultMessage: 'Indonesian rupiah',
  },
  cny: {
    id: 'cny',
    defaultMessage: 'Chinese Yuan',
  },
  withdraw: {
    id: 'currency.withdraw',
    defaultMessage: 'Withdraw',
  },
  weWithdrawFunds: {
    id: 'currency.weWithdrawFunds',
    defaultMessage: 'We withdraw funds',
  },
  withdrawalSuccessfully: {
    id: 'currency.withdrawalSuccessfully',
    defaultMessage: 'Withdrawal Successfully',
  },
  withdrawal: {
    id: 'currency.withdrawal',
    defaultMessage: 'Withdrawal',
  },
  refill: {
    id: 'currency.refill',
    defaultMessage: 'Refill',
  },
  refillAmount: {
    id: 'currency.refillAmount',
    defaultMessage: 'Refill Amount',
  },
  withdrawAmount: {
    id: 'currency.withdrawAmount',
    defaultMessage: 'Withdraw Amount',
  },
  minRefillAmount: {
    id: 'currency.minRefillAmount',
    defaultMessage: 'The minimum refill amount is {amount}',
  },
  maxRefillAmount: {
    id: 'currency.maxRefillAmount',
    defaultMessage: 'The maximum refill amount is {amount}',
  },
  minWithdrawAmount: {
    id: 'currency.minWithdrawAmount',
    defaultMessage: 'The minimum withdraw amount is {amount}',
  },
  maxWithdrawAmount: {
    id: 'currency.maxWithdrawAmount',
    defaultMessage: 'The maximum withdraw amount is {amount}',
  },
  chooseBank: {
    id: 'currency.chooseBank',
    defaultMessage: 'Choose Bank',
  },
  bankDeposit: {
    id: 'currency.bankDeposit',
    defaultMessage: '{bank} Deposit',
  },
  virtualAccountNumber: {
    id: 'currency.virtualAccountNumber',
    defaultMessage: 'Virtual Account Number',
  },
  virtualAccountName: {
    id: 'currency.virtualAccountName',
    defaultMessage: 'Virtual Account Name',
  },
  accountHolderName: {
    id: 'currency.accountHolderName',
    defaultMessage: 'Account Holder Name',
  },
  accountNumberIncorrectly: {
    id: 'currency.accountNumberIncorrectly',
    defaultMessage: 'Account number entered incorrectly',
  },
  accountHolderNameIncorrectly: {
    id: 'currency.accountHolderNameIncorrectly',
    defaultMessage: 'Account holder name entered incorrectly',
  },
  accountNumber: {
    id: 'currency.accountNumber',
    defaultMessage: 'Account Number',
  },
  warning: {
    id: 'warning',
    defaultMessage: 'Warning!',
  },
  gotIt: {
    id: 'currency.gotIt',
    defaultMessage: 'Got it',
  },
  maxAmount: {
    id: 'currency.maxAmount',
    defaultMessage: 'max. {maxAmount}',
  },
  feePercentageAndMin: {
    id: 'currency.feePercentageAndMin',
    defaultMessage: 'Fee: {feePercentage} {feeMin} minimum',
  },
  toCredit: {
    id: 'currency.toCredit',
    defaultMessage: 'To credit: {amount}',
  },
  toWithdraw: {
    id: 'currency.toWithdraw',
    defaultMessage: 'To withdraw: {amount}',
  },
  availableToWithdraw: {
    id: 'currency.availableToWithdraw',
    defaultMessage: 'Available: {amount}',
  },
};
export default defineMessages(messages);
