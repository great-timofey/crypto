export interface BalancesState {
  loading: boolean;
  refresh: boolean;
  balances: {
    exchange: number;
    crypto: number;
    fiat: number;
  };
  totalAmount: {
    usd: number;
    btc: number;
  };
}
