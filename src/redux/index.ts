import { sagaMiddleware, appStore, persistor } from './store';
import { rootSaga } from './saga';

export function getStore() {
  sagaMiddleware.run(rootSaga);
  return { appStore, persistor };
}
