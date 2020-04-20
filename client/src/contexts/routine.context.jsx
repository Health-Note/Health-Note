import { GET_ROUTINE, SET_DATE } from '../reducers/types';
import React, { createContext, useReducer, useState } from 'react';

import axios from 'axios';
import routineReducer from '../reducers/routine.reducer.js';
import setAuthToken from '../utils/setAuthToken';

export const RoutineContext = createContext();
export const DispatchContext = createContext();

export const RoutineProvider = props => {
  const initialState = [
    {
      exerciseId: null, //멤버
      scheduleId: null, //멤버
      memberId: null, //루틴
      setCount: null, //루틴
      repetitions: null, //루틴(모델링에 따라 변경)
    },
  ];

  const [routineState, dispatch] = useReducer(routineReducer, initialState);
  const [scheduleId, setScheduleId] = useState('');

  const setSelectedDate = (date, scheduleId) => {
    setScheduleId(scheduleId);
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
  const getRoutine = async (scheduleId, date) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    console.log(scheduleId);
    const res = await axios.post(`/api/routine/${scheduleId}`, {
      scheduleId,
      date,
    });
    console.log(res.data);
  };

  /* <setRoutine api>
   *  body: phonenum, date, reps, sets, exerciseName
   */
 

  return (
    <RoutineContext.Provider
      value={{ setSelectedDate, getRoutine, routineState }}
    >
      {props.children}
    </RoutineContext.Provider>
  );
};
