import { call, put, takeLatest, fork, select, take } from 'redux-saga/effects';
import axios from '../../apis';
import { user, status } from '../actions'; 
import { push } from 'react-router-redux';
import { Toast } from 'antd-mobile';


function delay (interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), interval);
  });
}

function* login ({accesstoken}) {
  try {
    yield put(status.setSubmitting());
    const data = (yield call(axios.post, '/accesstoken', {accesstoken})).data;
    yield put(user.loginSuccess(accesstoken, data.loginname, data.id));
    window.localStorage.setItem('accesstoken', accesstoken);
    window.localStorage.setItem('loginname', data.loginname);
    window.localStorage.setItem('id', data.id);
    Toast.success('登录成功', 1);
    yield call(delay, 500);
    yield put(push('/'));
  } catch (err) {
    yield put(user.loginFail());
  } finally {
    yield put(status.setSubmitting());    
  }
}

function logout () {
  return new Promise(resolve => {
    window.localStorage.removeItem('accesstoken');
    window.localStorage.removeItem('loginname');
    window.localStorage.removeItem('id');
    resolve();    
  })
}

function* watchLogin () {
  while (true) {
    const actions = yield take(user.LOGIN);
    yield call(login, actions);
  }
}

function* watchLogOut () {
  while (true) {
    yield take(user.LOGOUT);
    yield call(logout);
  }
}

function* getInfo ({loginname}) {
  if (!loginname) loginname = yield select(state => state.user.loginname);
  try {
    yield put(status.setLoading());
    const data = (yield call(axios.get, `/user/${loginname}`)).data;
    yield put(user.getuserInfoSuccess(data.data));
  } catch (err) {
    yield put(user.getUserInfoFail());
  } finally {
    yield put(status.setLoading());    
  }
}

function* watchGetInfo () {
  yield takeLatest(user.GETUSERINFO, getInfo);
}

function* getMessageCount () {
  try {
    const accesstoken = yield select(state => state.user.accesstoken);
    const data = (yield call(axios.get, `/message/count?accesstoken=${accesstoken}`)).data;
    yield put(user.getMessageCountSuccess(data.data));
  } catch (err) {
    yield put(user.getMessageCountFail());
  }
}

function* watchGetMessageCount () {
  yield takeLatest(user.GETMESSAGECOUNT, getMessageCount);
}

function* getCollections () {
  try {
    const loginname = yield select(state => state.user.loginname);
    yield put(status.setLoading());
    const data = (yield call(axios.get, `/topic_collect/${loginname}`)).data;
    yield put(user.getCollectionsSuccess(data.data));
  } catch (err) {
    yield put(user.getCollectionsFail());
  } finally {
    yield put(status.setLoading());    
  }  
}

function* watchGetCollections () {
  yield takeLatest(user.GETCOLLECTIONS, getCollections);
}

function* getMessages () {
  try {
    const accesstoken = yield select(state => state.user.accesstoken);
    yield put(status.setLoading());
    const data = (yield call(axios.get, `/messages?accesstoken=${accesstoken}`)).data;
    yield put(user.getMessagesSuccess(data.data));
  } catch (err) {
    yield put(user.getMessagesFail());
  } finally {
    yield put(status.setLoading());    
  }   
}

function* markAll () {
  try {
    const accesstoken = yield select(state => state.user.accesstoken);
    yield call(axios.post, `/message/mark_all`, {
      accesstoken
    });
    yield put(user.markAllSuccess());
  } catch (err) {
    yield put(user.markAllFail());
  }
}

function* messageFlow () {
  while (true) {
    yield take(user.GETMESSAGES);
    yield call(getMessages);
    yield take(user.MARKALL);
    yield call(markAll);
  }
}

export default function* root () {
  yield fork(watchLogin);
  yield fork(watchLogOut);
  yield fork(watchGetInfo);
  yield fork(watchGetMessageCount);
  yield fork(watchGetCollections);
  yield fork(messageFlow);
}
