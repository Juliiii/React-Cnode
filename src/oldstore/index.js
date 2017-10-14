// Step 1: import createStore from redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import * as sagas from './sagas';
// Step 2: setup a reducer
import * as reducer from './reducers';
const rootReducer = combineReducers({
  ...reducer,
  routing: routerReducer
});

const broswerHistoryRouterMiddleware = routerMiddleware(browserHistory);

// Step 3: run a saga
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, broswerHistoryRouterMiddleware));


sagaMiddleware.run(sagas.topicsSaga);
sagaMiddleware.run(sagas.userSaga);

// store.subscribe(() => console.log(store.getState()));

export default store;