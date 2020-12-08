import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState(
  afterActiveCallback?: () => void,
  afterInactiveCallback?: () => void,
) {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (afterActiveCallback) {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
          afterActiveCallback();
        }
      }

      if (afterInactiveCallback) {
        if (appState.match(/active/) && nextAppState.match(/inactive|background/)) {
          afterInactiveCallback();
        }
      }

      setAppState(nextAppState);
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState, afterInactiveCallback, afterActiveCallback]);

  return appState;
}
