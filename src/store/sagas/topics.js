import axios from '../../apis';
import { call, put, select, fork, take, takeLatest } from 'redux-saga/effects';
import { topics } from '../actions';

function* getData () {
  try {
    const tab = yield select(state => state.topics.tab);
    const page = yield select(state => state.topics.page);
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

function* publish ({payload}) {
  try {
    const accesstoken = yield select(state => state.user.accesstoken);
    Object.assign(payload, { accesstoken });
    yield call(axios.post, '/topics', payload);
    yield put(topics.publishSuccess());
  } catch (err) {
    yield put(topics.publishFail());
  }
}

function* watchPublish () {
  yield takeLatest(topics.PUBLISH, publish);
}



export default function* root () {
  yield fork(watchGetData);
  yield fork(watchRefresh);
  yield fork(watchPublish);
}