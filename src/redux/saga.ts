import { all } from 'redux-saga/effects';

import { rootAuthSaga } from './auth/saga';
import { rootCommonSaga } from './common/saga';
import { rootBalancesSaga } from './balances/saga';
import { rootNotificationsSaga } from './notifications/saga';
import { rootWalletSaga } from './wallets/saga';
import { rootProfileSaga } from './profile/saga';
import { rootSwapSaga } from './swap/saga';

export function* rootSaga() {
  yield all([
    rootAuthSaga(),
    rootCommonSaga(),
    rootBalancesSaga(),
    rootNotificationsSaga(),
    rootWalletSaga(),
    rootProfileSaga(),
    rootSwapSaga(),
  ]);
}
