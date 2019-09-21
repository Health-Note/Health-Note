import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import routineReducer from '../reducers/routine.reducer.js';
import setAuthToken from '../utils/setAuthToken';
import { GET_ROUTINE, SET_DATE } from '../reducers/types';

export const RoutineContext = createContext();
export const DispatchContext = createContext();

export const RoutineProvider = props => {
  const initialState = {
    date: null, //멤버
    memberName: null, //멤버
    reps: 0, //루틴
    sets: 0, //루틴
    exercises: [], //루틴(모델링에 따라 변경)
    recentWorkout: [], //루틴
    error: null,
  };

  const [routineState, dispatch] = useReducer(routineReducer, initialState);
  const [phonenum, setPhonenum] = useState('');

  const setSelectedDate = (date, phonenum) => {
    setPhonenum(phonenum);
    dispatch({ type: SET_DATE, payload: { date } });
    //getRoutine(date, phonenum);
  };

  /* <getRoutine api>
   *  body: phonenum, date
   *  res: {
   *    date: date,
   *    memberName: name
   *    exercises: [],
   *    recentWorkout: [],
   *  }
   */
  const getRoutine = async (phonenum, date) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.post('/api/routine/getRoutine', { phonenum, date });
    console.log(res.data);
  };

  /* <setRoutine api>
   *  body: phonenum, date, reps, sets, exerciseName
   */
  const setRoutine = async (exerciseName, reps, sets) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.post('/api/routine/setRoutine', {
      date: routineState.date,
      phonenum,
      reps,
      sets,
      exerciseName,
    });
    console.log(res.data);
  };

  return (
    <RoutineContext.Provider
      value={{ setSelectedDate, setRoutine, getRoutine, routineState }}
    >
      <DispatchContext.Provider value={dispatch}>
        {' '}
        {/* dispatch를 계속해서 만들어내지 않게 객체형태로 보내지 않는다 */}
        {props.children}
      </DispatchContext.Provider>
    </RoutineContext.Provider>
  );
};
