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
      exercise_id: null, //멤버
      schedule_id: null, //멤버
      member_id: null, //루틴
      setCount: null, //루틴
      repetitions: null, //루틴(모델링에 따라 변경)
    },
  ];

  const [routineState, dispatch] = useReducer(routineReducer, initialState);
  const [schedule_id, setSchedule_id] = useState('');

  const setSelectedDate = (date, schedule_id) => {
    setSchedule_id(schedule_id);
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
  const getRoutine = async (schedule_id, date) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    console.log(schedule_id);
    const res = await axios.post(`/api/routine/${schedule_id}`, {
      schedule_id,
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
