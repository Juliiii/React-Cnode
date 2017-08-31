import axios from '../../apis';
import { call, put, select, fork, take } from 'redux-saga/effects';
import { topics } from '../actions';

function* getData () {
  try {
    const tab = yield select(state => state.topics.tab);
    const page = yield select(state => state.topics.page);
    // yield put(topics.setLoading());
    const { data } = yield call(axios.get, `/topics?tab=${tab}&page=${page+1}`);
    yield put(topics.getTopicsSuccess(data.data));
  } catch (err) {
    yield put(topics.getTopicsFail());
  }
}


function* watchGetData () {
    while (true) {
      yield take(topics.SETLOADING);
      yield take(topics.GETTOPICS);
      yield call(getData);
    }
}


function* refresh () {
  try {
    const tab = yield select(state => state.topics.tab);
    const { data } = yield call(axios.get, `/topics?tab=${tab}&page=0`);

    yield put(topics.refreshSuccess(data.data));
  } catch (err) {
    yield put(topics.refreshFail());
  }
}


function* watchRefresh () {
  while (true) {
    yield take(topics.SETREFRESH);
    yield take(topics.REFRESH);
    yield call(refresh);
  }
}

export default function* root () {
  yield fork(watchGetData);
  yield fork(watchRefresh);
}