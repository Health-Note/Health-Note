import { combineReducers } from 'redux';
import auth from './auth.reducer';
import member from './members.reducer';

const rootReducer = combineReducers({
  auth,
  member
});

export default rootReducer;
