import React, { createContext, useReducer } from 'react';
import scheduleReducer from '../reducers/schedule.reducer.js';
import Axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { SET_FIXED_SCHEDULE, GET_FIXED_SCHEDULE } from '../reducers/types';

export const fixedScheduleContext = createContext();
export const DispatchContext = createContext();

const initialState = [
  {
    title: null,
    id: null,
    start: null,
  },
];

export const FixedScheduleProvider = props => {
  // useEffect(() => {
  //     fetch("/sendBasicsForSchedule", {
  //         method: "get",
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         }
  //       }).then((res) => {
  //         return res.json();
  //       }).then((data) => {
  //         // 이름, 폰넘버, 날짜, 시간을 받아온다.
  //         // db연결시 schduleList를 리듀서 두번째 인자에 초기값으로 넣어주면 됨.

  //         })
  //         //console.log(scheduleList);
  //         // 그럼 이제 calandar.js의 state에 어떻게 넣어줄 것인가?
  //         // this.setState({
  //         //   calendarEvents: this.state.calendarEvents.concat(scheduleList)
  //         // })
  // }, [])

  /*
   * AJAX
   * 작성일: 2019.09.09 (월)
   * 작성자: 박종열
   * 기능: 외부이벤트를 캘린더에 넣을때 마다 고정 스케줄을 만들 데이터를 보냄
   * body: start_date, day, member_id
   */
  const setFixedSchedule = async data => {
    console.log('fixedSchedule.context.data', data);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const settings = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      const res = await Axios.post(
        '/api/fixedSchedules/setFixedSchedule',
        data,
        settings
      );
      console.log('schedule.context_res.data', res.data);
      dispatch({ type: SET_FIXED_SCHEDULE, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const getFixedSchedule = async () => {
    console.log('getfixedSchedule');
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await Axios.get('/api/fixedSchedules/getFixedSchedule');
      console.log('schedule.context_getfixedSchedule', res.data);
      dispatch({ type: GET_FIXED_SCHEDULE, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const [schedules, dispatch] = useReducer(scheduleReducer, initialState);

  return (
    <fixedScheduleContext.Provider
      value={{ schedules, setFixedSchedule, getFixedSchedule }}
    >
      <DispatchContext.Provider value={dispatch}>
        {' '}
        {/*dispatch를 계속해서 만들어내지 않게 객체형태로 보내지 않는다 */}
        {props.children}
      </DispatchContext.Provider>
    </fixedScheduleContext.Provider>
  );
};
