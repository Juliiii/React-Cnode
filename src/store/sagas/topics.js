import axios from '../../apis';
import { call, put, select, fork, take, takeLatest } from 'redux-saga/effects';
import { topics, status } from '../actions';
import { push } from 'react-router-redux';

function dbSave (args) {
  for (const arg of Object.entries(args)) {
    localStorage.setItem(arg[0], JSON.stringify(arg[1]));
  }
};


function* getData () {
  try {
    yield put(status.setLoading());
    const tab = yield select(state => state.topics.tab);
    const page = yield select(state => state.topics.page);
    const limit = yield select(state => state.topics.limit);
    const oldData = yield select(state => state.topics.data);
    const { data } = yield call(axios.get, `/topics?tab=${tab}&page=${page+1}&limit=${limit}`);
    if (data.length === 0) {
      yield put(status.setReachend(true));
    }
    const newData = [...oldData, ...data.data];
    dbSave({
      data: newData,
      page: page + 1,
      tab
    });
    yield put(topics.getTopicsSuccess(newData));
  } catch (err) {
    yield put(topics.getTopicsFail());
  } finally {
    yield put(status.setLoading());    
  }
}

function* watchGetData () {
  yield takeLatest(topics.GETTOPICS, getData);
}

function* refresh () {
  try {
    yield put(status.setRefresh());
    const tab = yield select(state => state.topics.tab);
    const limit = yield select(state => state.topics.limit);
    const { data } = yield call(axios.get, `/topics?tab=${tab}&page=0&limit=${limit}`);
    localStorage.setItem('data', JSON.stringify(data.data));
    dbSave({
      data: data.data,
      page: 0,
      tab
    });
    yield put(topics.refreshSuccess(data.data));
  } catch (err) {
    yield put(topics.refreshFail());
  } finally {
    yield put(status.setRefresh());    
  }
}


function* watchRefresh () {
  yield takeLatest(topics.REFRESH, refresh);
}

function* publish ({payload}) {
  try {
    yield put(status.setSubmitting());
    const accesstoken = yield select(state => state.user.accesstoken);
    Object.assign(payload, { accesstoken });
    yield call(axios.post, '/topics', payload);
    yield put(push('/success'));
    yield put(topics.publishSuccess());
  } catch (err) {
    yield put(topics.publishFail());
  } finally {
    yield put(status.setSubmitting());    
  }
}

function* watchPublish () {
  yield takeLatest(topics.PUBLISH, publish);
}

function* getDetail ({id}) {
  try {
    const accesstoken = yield select(state => state.user.accesstoken);
    yield put(status.setLoading());
    const {data} = yield call(axios.get, `/topic/${id}?mdrender=true&accesstoken=${accesstoken}`);
    yield put(topics.getDetailSuccess(data.data));
  } catch (err) {
    yield put(topics.getDetailFail());
  } finally {
    yield put(status.setLoading());    
  }
}

function* watchGetDetail () {
  yield takeLatest(topics.GETDETAIL, getDetail);
}

function* collect ({id}) {
  const accesstoken = yield select(state => state.user.accesstoken);
  if (!accesstoken) return;
  try {
    yield put(status.setSubmitting());
    yield call(axios.post, '/topic_collect/collect', { accesstoken, topic_id: id });
    yield put(topics.collectSuccess());
  } catch (err) {
    yield put(topics.collectFail());
  } finally {
    yield put(status.setSubmitting());
  }
}

function* decollect ({id}) {
  const accesstoken = yield select(state => state.user.accesstoken);
  if (!accesstoken) return;
  try {
    yield put(status.setSubmitting());
    yield call(axios.post, '/topic_collect/de_collect', { accesstoken, topic_id: id });
    yield put(topics.decollectSuccess());
  } catch (err) {
    yield put(topics.decollectFail());
  } finally {
    yield put(status.setSubmitting());
  }
}

function* watchCollect () {
  while (true) {
    let actions = yield take(topics.COLLECT);
    yield call(collect, actions);
    actions = yield take(topics.DECOLLECT);
    yield call(decollect, actions);
  }
}

export default function* root () {
  yield fork(watchGetData);
  yield fork(watchRefresh);
  yield fork(watchPublish);
  yield fork(watchGetDetail);
  yield fork(watchCollect);
}