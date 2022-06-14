import { reactotronConfig } from 'reactotron-react-native';
import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

// State Type
import { IApplicationState } from './types';

// const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
//     console.log(JSON.stringify(store.dispatch, null, 2));
//     next(action);
// };
let sagaMiddleware = createSagaMiddleware();
if (__DEV__) {
    const sagaMonitor = reactotronConfig?.createSagaMonitor();
    sagaMiddleware = createSagaMiddleware({ sagaMonitor });
}

const store: Store<IApplicationState> = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
