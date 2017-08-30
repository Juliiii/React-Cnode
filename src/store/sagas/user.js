import { call, put, takeLatest, fork, select } from 'redux-saga/effects';
import axios from '../../apis';
import { user } from '../actions'; 
import { browserHistory } from 'react-router';

function* login ({accesstoken}) {
  try {
    yield put(user.toggle());
    const data = (yield call(axios.post, '/accesstoken', {accesstoken})).data;
    yield put(user.loginSuccess(accesstoken, data.loginname));
    window.localStorage.setItem('accesstoken', accesstoken);
    window.localStorage.setItem('loginname', data.loginname);
    browserHistory.push('/');
  } catch (err) {
    yield put(user.loginFail());
  }
}

function* watchLogin () {
  yield takeLatest(user.LOGIN, login);
}

function* getInfo ({loginname}) {
  if (!loginname) loginname = yield select(state => state.user.loginname);
  yield put(user.setLoading());
  try {
    const data = (yield call(axios.get, `/user/${loginname}`)).data;
    yield put(user.getuserInfoSuccess(data.data));
  } catch (err) {
    yield put(user.getUserInfoFail());
  }
}

function* watchGetInfo () {
  yield takeLatest(user.GETUSERINFO, getInfo);
}



export default function* root () {
  yield fork(watchLogin);
  yield fork(watchGetInfo);
}
