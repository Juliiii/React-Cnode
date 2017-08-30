// Step 1: import createStore from redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userSaga from './sagas/user';
// Step 2: setup a reducer
import * as reducer from './reducers';

const rootReducer = combineReducers({
  ...reducer
});

// Step 3: run a saga
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));



sagaMiddleware.run(userSaga);


export default store;