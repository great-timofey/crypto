import { COMMA_CHARACTER, DOT_CHARACTER, REGEXES } from '$global/constants';
import { CurrencyType } from '$global/types';

const validateZeroWithSeparators = (value: string) =>
  value.startsWith(`0${COMMA_CHARACTER}`) || value.startsWith(`0${DOT_CHARACTER}`);

export function validateSendValue(value: string, type: CurrencyType) {
  if (
    value.startsWith(COMMA_CHARACTER) ||
    value.startsWith(DOT_CHARACTER) ||
    (value.startsWith('0') && value.length > 1 && !validateZeroWithSeparators(value))
  )
    return false;

  return type === CurrencyType.fiat
    ? REGEXES.inputs.fiat.test(value)
    : REGEXES.inputs.crypto.test(value);
}
