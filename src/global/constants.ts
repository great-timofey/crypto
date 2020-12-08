export const SLIDE_ANIMATION_DURATION = 300;
export const KEYBOARD_OPENING_DURATION = 300;
export const DEFAULT_TOAST_DURATION = 1000;
export const BOTTOM_TAB_BAR_HEIGHT = 56;
export const DEFAULT_SCREEN_PADDING = 16;
export const CODE_INPUT_ERROR_DURATION = 1500;
export const PAGINATE_PAGE_COUNT = 50;

export const REGEXES = {
  // eslint-disable-next-line no-useless-escape
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  gaCode: /^\d{0,6}$/,
  emailCode: /^\d{0,6}$/,
  login: /^[\w-]{4,}$/,
  name: /^[A-Za-z\s]{2,}$/,
  accountNumber: /^[\d]{4,}$/,
  accountHolderName: /^[A-zА-я. -]{4,}$/,
  createPassword: {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digits: /[0-9]/,
    length: /\S{8,}/,
  },
  inputs: {
    fiat: /^\d*([,.]\d{0,2})?$/,
    crypto: /^\d*([,.]\d{0,8})?$/,
  },
};

export const NON_BREAKING_SPACE = '\u00a0';
export const DOT_CHARACTER = '.';
export const COMMA_CHARACTER = ',';
export const FIAT_MAX_DECIMAL_LENGTH = 2;
export const CRYPTO_MAX_DECIMAL_LENGTH = 8;
