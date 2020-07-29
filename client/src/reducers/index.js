import { combineReducers } from 'redux';
import auth from './auth.reducer';
import members from './members.reducer';

const rootReducer = combineReducers({
  auth,
  members
});

export default rootReducer;
