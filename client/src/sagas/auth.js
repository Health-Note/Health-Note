import {
  all, fork, put, takeEvery, take, call, delay,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  USER_LOADED,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from '../reducers/types';
import setAuthToken from '../utils/setAuthToken';

const HELLO_SAGA = 'HELLO_SAGA';

// 로그인
function loginAPI(formData) {
// 서버에 요청
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
   axios.post('/api/auth/signin', formData, config);
   loadUser();
   console.log(error);
   dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg }); // 로그인 실패시 자동으로 서버의 msg가 catch로 옴(axios의 경우만)
}

// call 동기 _ api요청에서 주로 사용
function* login(action) {
  try {
    yield call(loginAPI, action.payload);
    yield delay(2000);
    yield put({
      type: LOGIN_SUCCESS,
      payload: action.payload,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOGIN_FAIL,
      payload: action.payload,
    });
  }
}

// takeLatest가 LOGIN 액션이 dispatch 되길 기다려서 dispatch될 때 login 제너레이터를 호출
function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST, login);
  // while(true){
  //     yield take(LOGIN); // take: 해당 액션이 dispatch되면 제너레이터를 next하는 이펙트 (take함수 안에 next가 들어있다)
  //     yield delay(2000);
  //     yield put({ // put: dispatch의 기능
  //         type: LOGIN_SUCCESS
  //     });
  // }
}

// 유저 로드
// - 토큰을 글로벌 헤드에 담은 후 토큰에 담긴 email 정보를 통해 트레이너(유저) 전체 정보를 가져온다.
// - 유저정보를 가져온 후 state에 담는다.

const loadUserApi = () => {
  axios.get('/api/auth/me');
}

const loadUser = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch({ type: USER_LOADED, payload: res.data }); // payload는 찾은 trainer
    console.log('loadUser', res.data);
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR });
  }
};

function* watchLoadUser() {
  yield takeEvery(LOAD_USER, loadUser)
}

export default function* userSaga() {
  yield all([
    fork(watchLogin), // fork안붙여도 되지만 붙이는 이유는 watchLogin, watchSignUp등 간에 비동기이기 때문에 의미론적으로 붙여놈
    fork(loadUser),
  ]);
}
