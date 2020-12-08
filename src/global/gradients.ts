export type Gradient = {
  angle: number;
  stops: [number, number];
  colors: [string, string];
};

export const GRADIENTS = {
  PrimaryBlue: { angle: 179, stops: [0, 100], colors: ['#4070FF', '#365FD9'] },
  CryptocurrencyNRFX: {
    angle: 135,
    stops: [0, 100],
    colors: ['#FABE4C', '#FA9751'],
  },
  CryptocurrencyBTC: {
    angle: 225,
    stops: [0, 100],
    colors: ['#F7B73B', '#F8A15D'],
  },
  CryptocurrencyBCH: {
    angle: 225,
    stops: [0, 100],
    colors: ['#F7B73B', '#F8A15D'],
  },
  CryptocurrencyETH: {
    angle: 225,
    stops: [0, 100],
    colors: ['#98B1F1', '#896ADF'],
  },
  CryptocurrencyLTC: {
    angle: 225,
    stops: [0, 100],
    colors: ['#7AC4F2', '#619ABE'],
  },
  CryptocurrencyXRP: {
    angle: 50,
    stops: [0, 100],
    colors: ['#23292F', '#485561'],
  },
  CryptocurrencyUSDT: {
    angle: 50,
    stops: [0, 100],
    colors: ['#7BB7A3', '#5AA58C'],
  },
};
