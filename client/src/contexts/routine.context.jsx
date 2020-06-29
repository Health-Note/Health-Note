import { GET_ROUTINE, SET_DATE } from '../reducers/types';
import React, { createContext, useContext, useReducer, useState } from 'react';
import axios from 'axios';
import routineReducer from '../reducers/routine.reducer.js';
import setAuthToken from '../utils/setAuthToken';
import { ScheduleContext } from './schedule.context';

export const RoutineContext = createContext();
export const DispatchContext = createContext();


export const RoutineProvider = props => {
  const { targetSchedule } = useContext(
    ScheduleContext,
  );
  const initialState = [
    {
      exerciseCode: null, //멤버
      scheduleId: null, //멤버
      memberId: null, //루틴
      routineOrder: null,
      isCardio: null,
      cardioTime: null,
      repetitions: null, //루틴(모델링에 따라 변경)
      setCount: null, //루틴
      maxWeight: null,
      targetCode: null,
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
    const res = await axios.get(`/api/routines/${scheduleId}`);
    console.log('getRoutine', res.data);
    dispatch({ type: GET_ROUTINE, payload: res.data });
  };

  const saveRoutines = async (deleteRoutine, updateRoutine) => {
    const routine = {
      scheduleId: targetSchedule.id,
      deleteRoutine: deleteRoutine,
      updateRoutine: updateRoutine,
    };
    console.log(routine);
    const res = await axios.post(`/api/routine`);
    console.log(res);
  };

  return (
    <RoutineContext.Provider
      value={{ setSelectedDate, getRoutine, saveRoutines, routineState }}
    >
      {props.children}
    </RoutineContext.Provider>
  );
};
