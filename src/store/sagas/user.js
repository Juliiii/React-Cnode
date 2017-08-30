import { call, put, takeEvery, fork } from 'redux-saga/effects';
import axios from 'axios';
import { user } from '../actions'; 

function* test (a) {
  console.log(a);
  try {
    const data = yield call(axios.get, 'https://cnodejs.org/api/v1/user/alsotang');
    console.log(data);
    yield put(user.loginSuccess(data));
  } catch (err) {
    yield put(user.loginFail);
  }
}


function* watchTest () {
  yield takeEvery(user.LOGIN, test);
}





export default function* main () {
  yield fork(watchTest);
}

