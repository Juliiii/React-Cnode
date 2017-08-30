// Step 1: import createStore from redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas';
// Step 2: setup a reducer
import * as reducer from './reducers';
const rootReducer = combineReducers({
  ...reducer
});

// Step 3: run a saga
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));



sagaMiddleware.run(sagas.topicsSaga);
sagaMiddleware.run(sagas.userSaga);

export default store;