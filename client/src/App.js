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
import logger from 'redux-logger'
import DateFnsUtils from '@date-io/date-fns';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
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
