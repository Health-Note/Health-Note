import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import DashBoard from './components/dashBoard/DashBoard';
import rootReducer from './reducers';
import './App.css';
import rootSaga from './sagas';
import { createLogger } from 'redux-logger'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { RoutineProvider } from './contexts/routine.context';
import { MembersProvider } from './contexts/members.context';
import { ScheduleProvider } from './contexts/schedule.context';
import { AuthProvider } from './contexts/auth.context';
import { AlertProvider } from './contexts/alert.context';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

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
