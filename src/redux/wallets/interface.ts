import { CryptoCurrency, Currency, CurrencyType, FiatCurrency } from '$global/types';
import { HistoryListItem } from '$components/HistoryList/HistoryList.interface';

export interface BalancePrototype {
  id: number;
  amount: number;
  align: number;
  toUsd: number;
  toBtc: number;
}

export interface Balance extends BalancePrototype {
  currency: FiatCurrency;
}

export interface Wallet extends BalancePrototype {
  currency: CryptoCurrency;
  status: 'generated';
  address: string;
}

export interface History {
  error: boolean;
  loading: boolean;
  next: string | null;
  items: HistoryListItem[];
}

export interface WalletExtended extends Wallet {
  loading: boolean;
  refresh: boolean;
  history: History;
  sendLimit: {
    min: number;
    fee: number;
  };
}

export interface BalanceExtended extends Balance {
  loading: boolean;
  refresh: boolean;
  history: History;
}

export enum WalletOperationEnum {
  transfer = 'transfer',
  transaction = 'transaction',
}

export interface WalletsState {
  loading: boolean;
  refresh: boolean;
  wallets: Wallet[];
  balances: Balance[];
  currencies: Currencies;
  wallet: WalletExtended;
  balance: BalanceExtended;
  currencySendAddressWarningSeen: boolean;
  send: {
    activeStepIndex: number;
    type: WalletOperationEnum;
    loading: boolean;
    address: string;
    login: string;
    amount: string;
    amountUsd: string;
  };
  refill: {
    bankCode: string;
    amount: string;
    methods: {
      [key: string]: Method;
    };
    banksLoading: boolean;
    methodsLoading: boolean;
    banks: RefillBank[];
  };
  withdraw: {
    bankCode: string;
    banksLoading: boolean;
    methodsLoading: boolean;
    banks: WithdrawBank[];
    amount: string;
    accountNumber: string;
    accountHolderName: string;
    methods: {
      [key: string]: Method;
    };
  };
}

export interface Bank {
  name: string;
  code: string;
}

export interface WithdrawBank extends Bank {
  canDisburse: boolean;
  canNameValidate: boolean;
  limits: {
    min: number | null;
    max: number | null;
  };
}

export interface RefillBank extends Bank {
  accountNumber: string;
  serviceProviderCode?: string;
  methods: {
    name: string;
    steps: Array<string>;
  }[];
}

export type Method = {
  currencies: {
    [key in Currency]?: {
      minAmount: number;
      maxAmount: number;
      fees: {
        minFee: string;
        percentFee: number;
      };
    };
  };
};

export type Currencies = {
  [key in Currency]?: CurrenciesItem;
};

type Color = string;

export interface CurrenciesItem {
  abbr: Currency;
  name: string;
  icon: string;
  canGenerate: boolean;
  canExchange: boolean;
  toUsd: number;
  isExists: true;
  isFiat: true;
  maximumFractionDigits: number;
  type: CurrencyType;
  color: Color;
  gradient: [Color, Color];
  isAvailable: boolean;
}
