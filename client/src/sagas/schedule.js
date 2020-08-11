import axios from 'axios';
import { all, call, delay, fork, put, takeEvery } from 'redux-saga/effects';
import {
  GET_SCHEDULES_REQUEST,
  GET_SCHEDULES_SUCCESS,
  GET_SCHEDULES_ERROR,
  REMOVE_SCHEDULE_REQUEST,
  REMOVE_SCHEDULE_SUCCESS,
  REMOVE_SCHEDULE_ERROR,
  SET_SCHEDULE_REQUEST,
  SET_SCHEDULE_SUCCESS,
  SET_SCHEDULE_ERROR,
  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_ERROR,
  CREATE_ONE_SCHEDULE_REQUEST,
  CREATE_ONE_SCHEDULE_SUCCESS,
  CREATE_ONE_SCHEDULE_ERROR,
} from '../reducers/types';
import setAuthToken from '../utils/setAuthToken';
import seedColors from '../utils/seedColors';

const getScheduleApi = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    return axios.get('/api/schedules');
  } catch (err) {
    console.log(err);
  }
}

function* getSchedule(action) {
  try {
    const res = yield call(getScheduleApi, action.payload);
    yield put({ type: GET_SCHEDULES_SUCCESS, payload: { data: res.data, seedColors: seedColors } });
  } catch (error) {
    yield put({ type: GET_SCHEDULES_ERROR, payload: error });
  }
}

function* watchGetSchedule() {
  yield takeEvery(GET_SCHEDULES_REQUEST, getSchedule);
}

const removeScheduleApi = (id) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.post('/api/schedules/removeSchedule', {
    id,
  });
}

function* removeSchedule(action) {
  try {
    const res = yield call(removeScheduleApi, action.payload.id);
    if (res.data === 1) {
      yield put({ type: REMOVE_SCHEDULE_SUCCESS, payload: action.payload.id })
    }
  } catch (error) {
      yield put({ type: REMOVE_SCHEDULE_ERROR })
  }
}

function* watchRemoveSchedule() {
  yield takeEvery(REMOVE_SCHEDULE_REQUEST, removeSchedule);
}

const setScheduleApi = (data) => {
  // totalPT, startDate, days, phonenum
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const settings = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return axios.post(
    '/api/schedules/initializing',
    data,
    settings,
  );
};

function* setSchedule(action) {
  try {
    const res = yield call(setScheduleApi, action.payload)
    yield put({ type: SET_SCHEDULE_SUCCESS, payload: res.data });
    console.log('schedule.context_ SET_SCHEDULE_ res.data', res.data);
  } catch (error) {
    yield put({ type: SET_SCHEDULE_ERROR })
  }
}

function* watchSetSchedule() {
  yield takeEvery(SET_SCHEDULE_REQUEST, setSchedule);
}

const changeScheduleApi = (data) => {
  console.log("test", data.id, data.afterDate, data.startTime, data.endTime, data.memberId)
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
    return axios.patch(`/api/schedules/${data.id}`, {
      memberId: data.memberId,
      day: data.afterDate,
      startTime: data.startTime,
      endTime: data.endTime,
      isFinish: false,
      tooltipText: null
    });
};

function* changeSchedule(action) {
  try {
    const res = yield call(changeScheduleApi, action.payload)
    if (res.status === 204) {
      yield put({ type: UPDATE_SCHEDULE_SUCCESS, payload: {
          id: action.payload.id,
          startTime: action.payload.afterDate + ' ' + action.payload.startTime,
          endTime: action.payload.afterDate + ' ' + action.payload.endTime,
        }
      });
    }
    yield put({ type: UPDATE_SCHEDULE_SUCCESS, payload: res.data });
    console.log('schedule.context_ SET_SCHEDULE_ res.data', res.data);
  } catch (error) {
    yield put({ type: UPDATE_SCHEDULE_ERROR });
  }
}

function* watchChangeSchedule() {
  yield takeEvery(UPDATE_SCHEDULE_REQUEST, changeSchedule);
}

// 달력서 직접 스케줄 생성
const createOneScheduleApi = (data) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.post('/api/schedules', {
    memberId: data.memberId,
    startTime: data.startTime,
    endTime: data.endTime,
    day: data.day,
    isFinish: data.isFinish,
    tooltipText: "string"
  });
};

function* createOneSchedule(action) {
  try {
    const res = yield call(createOneScheduleApi, action.payload);
    let createdSchedule = {
      title: action.payload.memberName,
      start: action.payload.startTime,
      id: res.data.id,
      day: action.payload.day,
      memberId: action.payload.memberId,
    };
    console.log('createdSchedule', createdSchedule);
    yield put({ type: GET_SCHEDULES_REQUEST });
  } catch (e) {
    yield put({ type: CREATE_ONE_SCHEDULE_ERROR, payload: e });
  }
}

function* watchCreateOneScheduleApi() {
  yield takeEvery(CREATE_ONE_SCHEDULE_REQUEST, createOneSchedule);
}

// // 에러 초기화
// const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

export default function* scheduleSaga() {
  yield all([
    fork(watchGetSchedule),
    fork(watchRemoveSchedule),
    fork(watchSetSchedule),
    fork(watchChangeSchedule),
    fork(watchCreateOneScheduleApi),
  ]);
}