import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import { authReducerName, authReducer, blacklistedAuthFields } from './auth';
import { commonReducerName, commonReducer, blacklistedCommonFields } from './common';
import { balancesReducerName, balancesReducer } from './balances';
import { notificationsReducerName, notificationsReducer } from './notifications';
import { walletsReducerName, walletsReducer } from './wallets';
import { profileReducerName, profileReducer, blacklistedProfileFields } from './profile';
import { swapReducerName, swapReducer } from './swap';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: [...blacklistedAuthFields],
};

const profilePersistConfig = {
  key: 'profile',
  storage: AsyncStorage,
  blacklist: [...blacklistedProfileFields],
};

const commonPersistConfig = {
  key: 'common',
  storage: AsyncStorage,
  blacklist: [...blacklistedCommonFields],
};

export const rootReducer = combineReducers({
  [authReducerName]: persistReducer(authPersistConfig, authReducer),
  [commonReducerName]: persistReducer(commonPersistConfig, commonReducer),
  [balancesReducerName]: balancesReducer,
  [notificationsReducerName]: notificationsReducer,
  [walletsReducerName]: walletsReducer,
  [profileReducerName]: persistReducer(profilePersistConfig, profileReducer),
  [swapReducerName]: swapReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
