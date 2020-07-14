import {
  CREATE_ONE_SCHEDULE,
  GET_SCHEDULES,
  REMOVE_SHCEDULE,
  SET_SCHEDULE,
  SET_SCHEDULE_TARGET,
  UPDATE_SCHEDULE,
} from '../reducers/types';
import React, { createContext, useReducer, useState } from 'react';

import axios from 'axios';
import seedColors from '../utils/seedColors';
import scheduleReducer from '../reducers/schedule.reducer.js';
import setAuthToken from '../utils/setAuthToken';

export const ScheduleContext = createContext();
export const DispatchContext = createContext();

const initialState = {
  selectedSchedule: {
    id: null,
    memberId: null,
  },
  schedules: [
    {
      title: null, // memberName
      id: null,
      start: null,
      end: null,
      color: null,
      finish_dncd: false,
      target: null,
      borderColor: null,
      memberId: null,
    },
  ],
  isChanging: false
};

export const ScheduleProvider = props => {
  const [drawerBoolean, setDrawer] = useState(false);

  const setScheduleTarget = (id, memberId, memberName) => {
    dispatch({
      type: SET_SCHEDULE_TARGET,
      payload: { id, memberId, memberName },
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
        '/api/schedules/initializing',
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
      const res = await axios.get('/api/schedules');
      dispatch({ type: GET_SCHEDULES, payload: { data: res.data, seedColors: seedColors} });
      console.log('schedule.context/getAllSchedules/res.data', res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeSchedule = async id => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post('/api/schedules/removeSchedule', {
        id,
      });
      if (res.data === 1) {
        dispatch({ type: REMOVE_SHCEDULE, payload: id });
      }
      console.log('removeSchedule', res.data);
    } catch (err) {
      console.log('removeSchedule', err);
    }
  };

  const changeSchedule = async (id, afterDate, afterStartTime, afterEndTime, memberId) => {
    console.log("test", id, afterDate, afterStartTime, afterEndTime, memberId)
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.patch(`/api/schedules/${id}`, {
        memberId: memberId,
        day: afterDate,
        startTime: afterStartTime,
        endTime: afterEndTime,
        isFinish: false,
        tooltipText: null
      });
      console.log("res.status", res.status);
      if (res.status === 204) {
        dispatch({ type: UPDATE_SCHEDULE, payload: {
            id: id,
            startTime: afterDate + ' ' + afterStartTime,
            endTime: afterDate + ' ' + afterEndTime
          }
        });
      }
    } catch (err) {
      console.log('changeSchedule', err);
    }
  };

  const createOneSchedule = async (date, selectedMember) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post('/api/schedules', {
        date,
        memberId: selectedMember.id,
      });
      let createdSchedule = {
        title: selectedMember.name,
        start: res.data.startTime,
        id: res.data.id,
        memberId: res.data.memberId,
        color: 'red',
      };
      console.log('createdSchedule', createdSchedule);
      dispatch({ type: CREATE_ONE_SCHEDULE, payload: createdSchedule });
    } catch (err) {
      console.log('createOneSchedule', err);
    }
  };

  const [state, dispatch] = useReducer(scheduleReducer, initialState);

  return (
    <ScheduleContext.Provider
      value={{
        targetSchedule: state.selectedSchedule,
        schedules: state.schedules, // 전체 스케줄 state
        //target: state.target,
        isChanging: state.isChanging,
        setScheduleTarget, // 이벤트 클릭시 해당 이벤트를 state에 킵해둠
        setSchedule, // 멤버추가시 스케줄 추가
        getAllSchedules, // 스케줄 전체 받아오기
        drawerBoolean, // 드로어 true or false
        setDrawer, // 드로어 토글
        removeSchedule, // 스케줄 삭제
        changeSchedule,
        createOneSchedule,
      }}
    >
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </ScheduleContext.Provider>
  );
};
