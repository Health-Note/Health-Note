import React, { createContext, useReducer, useEffect } from 'react';
import scheduleReducer from '../reducers/schedule.reducer.js';
import uuid from 'uuid/v4';
import moment from 'moment';

export const ScheduleContext = createContext();
export const DispatchContext = createContext();

const defaultTodos = [
    {   
        name: "이서영",
        date: "20190814", // superkey
        phonenum: "01022221111", //superkey
        start_time: "1830", 
        end_Time: "1930",
        finish_dncd: true,
        start: "20190815 1930",
        
    },
    {   
        name: "이서영",
        date: "20190815", // superkey
        phonenum: "01055552222", //superkey
        start_time: "1830", 
        end_Time: "1930",
        finish_dncd: false,
        start: "20190814 1330",
    },
    {   
        name: "이서영",
        date: "20190816", // superkey
        phonenum: "01033335555", //superkey
        start_time: "1830", 
        end_Time: "1930",
        finish_dncd: false
    },
    { 
        
        name: "박종열",
        date: "20190816", // superkey
        phonenum: "01044447777", //superkey
        start_time: "1930", 
        end_Time: "1830",
        finish_dncd: false,
        start: "20190818 1930",
    },
    { 
        
        name: "박종열",
        date: "20190815", // superkey
        phonenum: "01033334444", //superkey
        start_time: "1830", 
        end_Time: "1930",
        finish_dncd: false,
        start: "20190816 1930",
    },
    {  
        
        name: "김정권",
        date: "20190816", // superkey
        start_time: "1800",
        phonenum: "01044445555", //superkey
        end_Time: "1930",
        finish_dncd: false,
        start: "20190816 1930",
    }
]

export const ScheduleProvider = (props) => {
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



    const [schedules, dispatch] = useReducer(scheduleReducer, defaultTodos);
    return(
        <ScheduleContext.Provider value={ schedules }>
            <DispatchContext.Provider value={ dispatch }> {/*dispatch를 계속해서 만들어내지 않게 객체형태로 보내지 않는다 */}
                {props.children}
            </DispatchContext.Provider>
        </ScheduleContext.Provider>
    )
}







    
    

