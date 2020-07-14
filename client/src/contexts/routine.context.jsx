import { DELETE_ROUTINE, GET_ROUTINES, INSERT_COUNT, SET_DATE, SET_ROUTINES } from '../reducers/types';
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
  const initialState = {
    scheduleId: null,
    loaded:[],
    routines: [{
      exerciseCode: null, //멤버
      exerciseName: null,
      targetName: null,
      memberId: null, //루틴
      routineOrder: null,
      isCardio: null,
      cardioTime: null,
      repetitions: null, //루틴(모델링에 따라 변경)
      setCount: null, //루틴
      maxWeight: null,
      targetCode: null,
    }],
    deletedCode: []
  }

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
  const getRoutines = async (scheduleId, date) => {
    console.log('scheduleId',scheduleId);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.get(`/api/routines/${scheduleId}`);
    console.log('getRoutine', res.data);
    dispatch({ type: GET_ROUTINES, payload: res.data, scheduleId: parseInt(scheduleId) });
  };

  const setRoutines = async (exerciseCode, exerciseName, targetCode, targetName, targetSchedule) => {
    console.log(exerciseCode, exerciseName, targetCode, targetName, targetSchedule)
    dispatch({
      type: SET_ROUTINES,
      payload:{
        exerciseCode: parseInt(exerciseCode),
        exerciseName: exerciseName,
        targetCode: parseInt(targetCode),
        targetName: targetName,
        scheduleId: targetSchedule.id,
        memberId: targetSchedule.memberId,
        cardioTime: "00:00:00",
        maxWeight: 0,
      }})
  };

  const saveRoutines = async () => {
    const routine = {
      scheduleId: parseInt(routineState.scheduleId),
      deleteRoutine: routineState.deletedCode,
      updateRoutine: routineState.routines.map(routine => {
        return {
          exerciseCode: routine.exerciseCode,
          routineOrder: routine.routineOrder,
          memberId: routine.memberId,
          isCardio: routine.isCardio,
          cardioTime: routine.cardioTime,
          setCount: routine.setCount,
          repetitions: routine.repetitions,
          targetCode: routine.targetCode,
          maxWeight: routine.maxWeight,
        };
      }),
    };
    console.log(routine)
    const res = await axios.post(`/api/routines`, routine);
    console.log(res);
  };

  const insertCount = async (exerciseCode, setCount, repetitions) => {
    dispatch({ type: INSERT_COUNT, payload: { exerciseCode, setCount, repetitions }})
  }

  const deleteRoutine = async (exerciseCode) => {
      dispatch({type: DELETE_ROUTINE, payload: {exerciseCode}})
  }

  return (
    <RoutineContext.Provider
      value={{
        setSelectedDate: setSelectedDate,
        getRoutines: getRoutines,
        setRoutines: setRoutines,
        saveRoutines: saveRoutines,
        insertCount: insertCount,
        deleteRoutine: deleteRoutine,
        routines: routineState.routines,
        loaded: routineState.loaded,
      }}
    >
      {props.children}
    </RoutineContext.Provider>
  );
};
