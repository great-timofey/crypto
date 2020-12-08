import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { rootReducer } from './reducer';
import { commonReducerName } from './common';
import { authReducerName } from './auth';
import { walletsReducerName } from './wallets';
import { balancesReducerName } from './balances';
import { swapReducerName } from './swap';
import { notificationsReducerName } from './notifications';

import { profileReducerName } from '$redux/profile';

let middleware;
export const sagaMiddleware = createSagaMiddleware({
  onError(err) {
    console.log('Error: ', err.message);
  },
});

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  const reduxDebugger = createDebugger();

  middleware = [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    reduxDebugger,
    sagaMiddleware,
  ];
} else {
  middleware = [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    sagaMiddleware,
  ];
}

const migrations = {};

const rootPersistConfig = {
  key: 'root',
  version: 1,
  migrate: createMigrate(migrations, { debug: true }),
  storage: AsyncStorage,
  blacklist: [
    commonReducerName,
    authReducerName,
    walletsReducerName,
    balancesReducerName,
    swapReducerName,
    notificationsReducerName,
    profileReducerName,
  ],
};

export const appStore = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware,
});

export const persistor = persistStore(appStore);

export type AppDispatch = typeof appStore.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
