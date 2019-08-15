import React, { createContext, useReducer, useEffect } from 'react';
import memberReducer from '../reducers/members.reducer.js';
import uuid from 'uuid/v4'

const defaultTodos = [
    //디비상에서 젠더는 INT이니 주의
    {
        id: uuid(),
        name: "이서영",
        phonenum:"01094325615",
        gender: 0,
        start: "20190917",
        endDate:"20191028",
        usedpt: 0,
        unusedpt: 16,
        height: 173,
        day: [0, 1, 3]
    },
    {   id: uuid(),
        name: "박종열",
        phonenum:"01020777538",
        gender: 1,
        startDate: "20190818",
        endDate:"20191027",
        usedpt: 2,
        unusedpt: 4 ,
        height: 180,
        day: [0, 1, 6]
    },
    {   id: uuid(),
        name: "김정권",
        phonenum:"01097045552",
        gender: "1",
        startDate: "20190819",
        endDate:"20191029",
        usedpt: 5,
        unusedpt: 10 ,
        height: 181,
        day: [1, 3, 5]
    }
]

export const MembersContext = createContext();
export const DispatchContext = createContext();

export function MembersProvider(props) {
    // 작성일: 2019.08.11 
    // 작성자: 박종열
    // 기능: 트레이너들의 회원목록(이름, 등록일, 마감일, 남은pt수) 가져오기, 정적 스케줄 가져오기
    useEffect(() => {
        fetch("/getMemberAndFixedSchedule", {
            method: "GET",
            headers: {
                "Content-Type": "application/json" 
            }
        }).then((res) => {
            return res.json()
        }).then((expectedMembers) => {
            //console.log("getMemberAndFixedSchedule", expectedMembers);
            // expectedMembers.map(cv => {...cv {gender: String(cv.gender)}})
        })
    }, [])

    
    const [members, dispatch] = useReducer(memberReducer, defaultTodos);
        return(
            <MembersContext.Provider value={ members }>
                <DispatchContext.Provider value={ dispatch }> {/*dispatch를 계속해서 만들어내지 않게 객체형태로 보내지 않는다 */}
                    {props.children}
                </DispatchContext.Provider>
            </MembersContext.Provider>
        )
}
