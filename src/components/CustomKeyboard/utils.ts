import { CustomKeyboardType } from './CustomKeyboard.interface';
import { CODE_BUTTONS_ENDING, NUMERIC_BUTTONS_ENDING } from './constants';

export function generateKeybaordButtons(type: CustomKeyboardType) {
  return Array.from({ length: 9 }, (_, index) => (index + 1).toString()).concat(
    type === 'code' ? CODE_BUTTONS_ENDING : NUMERIC_BUTTONS_ENDING,
  );
}
