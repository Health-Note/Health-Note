import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger'
import { BrowserRouter } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import setAuthToken from './utils/setAuthToken';
import DashBoard from './components/dashBoard/DashBoard';
import { RoutineProvider } from './contexts/routine.context';
import { MembersProvider } from './contexts/members.context';
import { ScheduleProvider } from './contexts/schedule.context';
import { AuthProvider } from './contexts/auth.context';
import { AlertProvider } from './contexts/alert.context';
import rootReducer from './reducers';
import './App.css';
import { Provider } from 'react-redux';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(createLogger())));

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <DashBoard/>
        </BrowserRouter>
      </Provider>
    </>
  );
}
export default App;
