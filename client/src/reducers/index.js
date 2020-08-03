import { combineReducers } from 'redux';
import auth from './auth.reducer';
import member from './members.reducer';
import schedule from './schedule.reducer';
import routine from './routine.reducer';

const rootReducer = combineReducers({
  auth,
  member,
  schedule,
  routine
});

export default rootReducer;
