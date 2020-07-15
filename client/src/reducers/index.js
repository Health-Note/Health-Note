import { combineReducers } from 'redux';
import user from './alert.reducer';
import auth from './auth.reducer';
import members from './members.reducer';
import routine from './routine.reducer'
import schedule from './schedule.reducer'

const rootReducer = combineReducers({
  user,
  auth,
  routine,
  members,
  schedule
});

export default rootReducer;
