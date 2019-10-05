import React, { createContext, useReducer, useState } from 'react';
import scheduleReducer from '../reducers/schedule.reducer.js';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  SET_SCHEDULE,
  GET_SCHEDULES,
  SET_SCHEDULE_TARGET,
} from '../reducers/types';

export const ScheduleContext = createContext();
export const DispatchContext = createContext();

const initialState = {
  selectedSchedule: {
    scheduleId: null,
    memberId: null
  },
  schedules: [
    {
      title: null,
      id: null, // phonenum
      start: null,
      color: null,
      finish_dncd: false,
      target: null,
      borderColor: null,
      memberId: null,
    },
  ],
};

export const ScheduleProvider = props => {
  const [drawerBoolean, setDrawer] = useState(false);

  const setScheduleTarget = (scheduleId, memberId) => {
    dispatch({
      type: SET_SCHEDULE_TARGET,
      payload: { scheduleId, memberId },
    });
  };

  const setSchedule = async data => {
    // totalPT, startDate, days, phonenum
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const settings = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    try {
      const res = await axios.post(
        '/api/schedules/setSchedule',
        data,
        settings
      );
      console.log('schedule.context_ SET_SCHEDULE_ res.data', res.data);
      dispatch({ type: SET_SCHEDULE, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllSchedules = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/schedules/getAllSchedules');
      dispatch({ type: GET_SCHEDULES, payload: res.data });
      console.log('schedule.context/getAllSchedules/res.data', res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeSchedule = async (scheduleId, memberId) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post('/api/schedules/removeSchedule', {
        scheduleId,
        memberId,
      });
      console.log('removeSchedule', res.data);
    } catch (err) {
      console.log('removeSchedule', err);
    }
  };

  const [state, dispatch] = useReducer(scheduleReducer, initialState);

  return (
    <ScheduleContext.Provider
      value={{
        targetSchedule: state.selectedSchedule,
        schedules: state.schedules, // 전체 스케줄 state
        target: state.target,
        setScheduleTarget, // 이벤트 클릭시 해당 이벤트를 state에 킵해둠
        setSchedule, // 멤버추가시 스케줄 추가
        getAllSchedules, // 스케줄 전체 받아오기
        drawerBoolean, // 드로어 true or false
        setDrawer, // 드로어 토글
        removeSchedule, // 스케줄 삭제
      }}
    >
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </ScheduleContext.Provider>
  );
};
