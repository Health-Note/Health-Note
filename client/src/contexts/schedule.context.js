import React, { createContext, useReducer, useContext } from 'react';
import scheduleReducer from '../reducers/schedule.reducer.js';
import Axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { MembersContext } from './members.context';

import { 
    SET_SCHEDULE
 } from '../reducers/types';

export const ScheduleContext = createContext();
export const DispatchContext = createContext();

const initialState = [
    {
        title: null,
        id: null, // phonenum
        start: null,
        finish_dncd: false,
    }
]

export const ScheduleProvider = (props) => {
   const { members } = useContext(MembersContext);
   console.log("inside schedule constext", members)
   
   const setSchedule = async data => { // unusedpt, start_date, days, phonenum
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        const settings = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        try {
            const res = await Axios.post("/api/schedules/setSchedule", data, settings);
            console.log("schedule.context_ SET_SCHEDULE_ res.data", res.data);
            dispatch({ type: SET_SCHEDULE, payload: res.data });
        } catch (err) {
            console.log(err);
        }
    }

    const [schedules, dispatch] = useReducer(scheduleReducer, initialState);

    return (
        <ScheduleContext.Provider value={{ schedules, setSchedule }}>
            <DispatchContext.Provider value={ dispatch }> {/*dispatch를 계속해서 만들어내지 않게 객체형태로 보내지 않는다 */}
                {props.children}
            </DispatchContext.Provider>
        </ScheduleContext.Provider>
    )
}
