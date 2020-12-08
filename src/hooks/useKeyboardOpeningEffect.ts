import { useEffect, useRef } from 'react';

import { KEYBOARD_OPENING_DURATION } from '$global/constants';

export function useKeyboardOpeningEffect(effect: () => void, deps: any[]) {
  const focusTimer = useRef<number | null>(null);

  return useEffect(() => {
    if (focusTimer.current !== null) {
      clearTimeout(focusTimer.current);
    }

    focusTimer.current = setTimeout(() => {
      effect();
    }, KEYBOARD_OPENING_DURATION);

    return () => {
      if (focusTimer.current) {
        clearTimeout(focusTimer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
