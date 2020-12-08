import { DOT_CHARACTER, FIAT_MAX_DECIMAL_LENGTH, NON_BREAKING_SPACE } from '../constants';

/**
 * helper for numbers display unification without react-intl
 * useful for redux / sagas etc.
 * @param num number to format
 * @param fractionDigits amount of digits num be fixed to
 * @returns formatted literal representation of given number
 */
export function numberFormat(num: number, fractionDigits = FIAT_MAX_DECIMAL_LENGTH) {
  return num
    .toFixed(fractionDigits)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${NON_BREAKING_SPACE}`);
}

/**
 * helper for numbers display unification with FormattedNumberParts
 * @param type FormattedNumberParts children type
 * @param value FormattedNumberParts children value
 * @returns correct symbol for decimal and group separators
 */
export function renderNumberChar(type: string, value: string) {
  if (type === 'decimal') {
    return DOT_CHARACTER;
  }

  if (type === 'group') {
    return NON_BREAKING_SPACE;
  }

  return value;
}

export function getValueByPressKey(currentValue: string, key: string) {
  let newValue = currentValue;

  if (key === DOT_CHARACTER) {
    if (!currentValue) {
      newValue = '0.0';
    } else if (!currentValue.includes(key)) {
      newValue += key;
    }
  } else if (parseFloat(currentValue) === 0 && !currentValue.startsWith('0.')) {
    newValue = key;
  } else {
    newValue += key;
  }

  return newValue;
}
