import {
  all, fork, put, takeEvery, take, call, delay,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  GET_MEMBER,

} from '../reducers/types';
import setAuthToken from '../utils/setAuthToken';

function getMemberApi(formData) {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const setting = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.get('/api/members', setting);
}

// call 동기 _ api요청에서 주로 사용
function* getMember(action) {
  try{
    const res = yield call(getMemberApi, action.payload);
    const members = res.data.map(cv => {
      return {
        id: cv.id,
        memberName: cv.memberName,
        phoneNum: cv.phoneNum,
        gender: cv.gender,
        startDate: cv.startDate,
        endDate: cv.endDate,
        usedPT: cv.usedPT,
        totalPT: cv.totalPT,
        height: cv.height,
      };
    });
    console.log(members);
    yield put({ type: GET_MEMBER, payload: members });
  } catch (err) {
    console.log(err);
  }
}

function* watchGetMember() {
  takeEvery(GET_MEMBER, getMember);
}

const addMemberApi = (formData) => {
  console.log('formdata', formdata)
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.post('/api/schedules/initializing', formdata);

}

function* addMember(action) {
  try {
    const res = yield call(addMemberApi, action.payload)
    console.log("res.data.id", res.data.id)
    if (res.status === 201) {
      const addedMember = {
        id: res.data.id,
        memberName: action.payload.memberName,
        phoneNum: action.payload.phoneNum,
        gender: action.payload.gender,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        usedPT: 0,
        totalPT: action.payload.totalPT,
        height: null
      }
      yield put({ type: ADD_MEMBER_SUCCESS, payload: addedMember });
    } else {
      console.log('어떤 에러');
    }
  } catch (error) {
    console.log(error);
    // dispatch({ type: ADD_MEMBER_ERROR, payload: error.response.data.msg });
  }
}

function* watchAddMember() {
  yield takeEvery(ADD_MEMBER_REQUEST, addMember)
}

// // 에러 초기화
// const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

export default function* userSaga() {
  yield all([
    fork(watchGetMember), // fork안붙여도 되지만 붙이는 이유는 watchLogin, watchSignUp등 간에 비동기이기 때문에 의미론적으로 붙여놈
    fork(watchAddMember),
    fork(watchRegister),
  ]);
}
