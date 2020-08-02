import { all, fork } from 'redux-saga/effects';
import authSaga from './auth';
import memberSaga from './member';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(memberSaga),
  ])
  yield console.log('hello saga')
}

export default rootSaga
