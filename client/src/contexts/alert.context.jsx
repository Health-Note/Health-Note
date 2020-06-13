import React, { createContext, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import alertReducer from '../reducers/alert.reducer';
import { REMOVE_ALERT, SET_ALERT } from '../reducers/types';

export const AlertContext = createContext();
export const AlertProvider = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // 얼럿 만들기
  const setAlert = (msg, alertType) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });
    // 얼럿 삭제
    setTimeout(() => dispatch({ type: REMOVE_ALERT, id }), 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
