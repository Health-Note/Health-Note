import { combineReducers } from 'redux';
import auth from './auth.reducer';
import member from './members.reducer';
import schedule from './schedule.reducer';

const rootReducer = combineReducers({
  auth,
  member,
  schedule,
});

export default rootReducer;
