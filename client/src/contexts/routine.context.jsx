import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import routineReducer from '../reducers/routine.reducer.js';
import setAuthToken from '../utils/setAuthToken';
import { GET_ROUTINE, SET_DATE } from '../reducers/types';

export const RoutineContext = createContext();
export const DispatchContext = createContext();

export const RoutineProvider = props => {
  const initialState = [
    {
      exerciseCode: null, //멤버
      scheduleId: null, //멤버
      memebrId: null, //루틴
      setCount: null, //루틴
      repititions: null, //루틴(모델링에 따라 변경)
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
    const res = await axios.post('/api/routine/getRoutine', {
      scheduleId,
      date,
    });
    console.log(res.data);
  };

  /* <setRoutine api>
   *  body: phonenum, date, reps, sets, exerciseName
   */
  const insertRoutine = async (exercises) => {
    console.log(exercises);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.post('/api/routine/setRoutine', {
      exercises
    });
    console.log(res.data);
  };

  return (
    <RoutineContext.Provider
      value={{ setSelectedDate, insertRoutine, getRoutine, routineState }}
    >
      {props.children}
    </RoutineContext.Provider>
  );
};
