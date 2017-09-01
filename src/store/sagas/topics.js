import axios from '../../apis';
import { call, put, select, fork, take, takeLatest } from 'redux-saga/effects';
import { topics } from '../actions';
import { Toast } from 'antd-mobile';

function* getData () {
  try {
    const tab = yield select(state => state.topics.tab);
    const page = yield select(state => state.topics.page);
    const limit = yield select(state => state.topics.limit);
    const { data } = yield call(axios.get, `/topics?tab=${tab}&page=${page+1}&limit=${limit}`);
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
    const limit = yield select(state => state.topics.limit);
    const { data } = yield call(axios.get, `/topics?tab=${tab}&page=0&limit=${limit}`);

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

function* getDetail ({id}) {
  try {
    const {data} = yield call(axios.get, `/topic/${id}`);
    yield put(topics.getDetailSuccess(data.data));
  } catch (err) {
    yield put(topics.getDetailFail());
  }
}

function* watchGetDetail () {
  yield takeLatest(topics.GETDETAIL, getDetail);
}

function* collect ({id}) {
  const accesstoken = yield select(state => state.user.accesstoken);
  if (!accesstoken) return;
  Toast.loading('loading', 0);
  try {
    yield call(axios.post, '/topic_collect/collect', { accesstoken, topic_id: id });
    yield put(topics.collectSuccess());
    Toast.hide();
    Toast.success('收藏成功');
  } catch (err) {
    yield put(topics.collectFail());
    Toast.hide();
  }
}

function* watchCollect () {
  yield takeLatest(topics.COLLECT, collect);
}

function* decollect ({id}) {
  const accesstoken = yield select(state => state.user.accesstoken);
  if (!accesstoken) return;
  Toast.loading('loading', 0);
  try {
    yield call(axios.post, '/topic_collect/de_collect', { accesstoken, topic_id: id });
    yield put(topics.decollectSuccess());
    Toast.hide();
    Toast.success('取消成功');
  } catch (err) {
    yield put(topics.decollectFail());
    Toast.hide();
  }
}

function* watchDecollect () {
  yield takeLatest(topics.DECOLLECT, decollect);
}


export default function* root () {
  yield fork(watchGetData);
  yield fork(watchRefresh);
  yield fork(watchPublish);
  yield fork(watchGetDetail);
  yield fork(watchCollect);
  yield fork(watchDecollect);
}