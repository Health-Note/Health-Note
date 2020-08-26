import axios from 'axios';
import { fork, call, all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_ROUTINES_REQUEST,
  GET_ROUTINES_SUCCESS,
  GET_MEMBER_ERROR,
  SAVE_ROUTINES_REQUEST,
  SAVE_ROUTINES_SUCCESS,
  SAVE_ROUTINES_ERROR
} from '../reducers/types';

const getRoutinesApi = (scheduleId) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.get(`/api/routines/${scheduleId}`);
};

function* getRoutines(action) {
  try {
    const res = yield call(getRoutinesApi, action.payload.scheduleId);
    console.log("resresres", res)
    yield put({
      type: GET_ROUTINES_SUCCESS,
      payload: {
        routines: res.data,
        scheduleId: parseInt(action.payload.scheduleId),
      },
    });
  } catch (e) {
    yield put({ type: GET_MEMBER_ERROR, payload: e });
  }
}

function* watchGetRoutines() {
  yield takeEvery(GET_ROUTINES_REQUEST, getRoutines);
}

const saveRoutinesApi = (routine) => {
  return axios.post(`/api/routines`, routine);
};

function* saveRoutines(action) {
  try {
    yield call(saveRoutinesApi, action.payload);
    yield put({
      type: SAVE_ROUTINES_SUCCESS,
      payload: action.payload
    });
  } catch (e) {
    put({ type: SAVE_ROUTINES_ERROR, payload: e });
  }
}

function* watchSaveRoutines() {
  yield takeEvery(SAVE_ROUTINES_REQUEST, saveRoutines);
}

export default function* routineSaga() {
  yield all([
    fork(watchGetRoutines),
    fork(watchSaveRoutines),
  ]);
}
