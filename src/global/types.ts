export type FiatCurrency = 'usd' | 'eur' | 'rub' | 'idr' | 'cny';
export type CryptoCurrency = 'usdt' | 'btc' | 'eth' | 'ltc' | 'nrfx';
export type Currency = FiatCurrency | CryptoCurrency;

export enum CurrencyType {
  crypto = 'crypto',
  fiat = 'fiat',
}

export enum StatusEnum {
  pending = 'pending',
  done = 'done',
  failed = 'failed',
  confirmation = 'confirmation',
  confirmed = 'confirmed',
  unconfirmed = 'unconfirmed',
  canceled = 'canceled',
}

export type Paginate<item> = {
  next: string | null;
  items: item[];
};
