import { useEffect, useCallback, useRef } from 'react';
import { Keyboard, Animated } from 'react-native';

import { KEYBOARD_OPENING_DURATION } from '$global/constants';

export function useKeyboardHeight(additionalHeight = 0) {
  const keyboardAnimatedHeight = useRef(new Animated.Value(additionalHeight)).current;
  const timerRef = useRef<null | number>(null);
  const keyboardShownRef = useRef<null | boolean>(null);

  const keyboardWillShowCallback = useCallback(
    (event: any) => {
      keyboardShownRef.current = true;
      Animated.timing(keyboardAnimatedHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height + additionalHeight,
        useNativeDriver: false,
      }).start();
    },
    [additionalHeight, keyboardAnimatedHeight],
  );

  const keyboardWillHideCallback = useCallback(
    (event: any) => {
      keyboardShownRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        if (!keyboardShownRef.current) {
          Animated.timing(keyboardAnimatedHeight, {
            duration: event.duration,
            toValue: additionalHeight,
            useNativeDriver: false,
          }).start();
        }
      }, KEYBOARD_OPENING_DURATION);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    },
    [additionalHeight, keyboardAnimatedHeight],
  );

  useEffect(() => {
    const willShowListener = Keyboard.addListener(
      'keyboardWillShow',
      keyboardWillShowCallback,
    );

    const willHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHideCallback,
    );

    return () => {
      willShowListener.remove();
      willHideListener.remove();
    };
  }, [keyboardWillHideCallback, keyboardWillShowCallback]);

  return keyboardAnimatedHeight;
}
