import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import memberSaga from './member';
import scheduleSaga from './schedule';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(memberSaga),
    fork(scheduleSaga),
  ])
  yield console.log('hello saga')
}

export default rootSaga
