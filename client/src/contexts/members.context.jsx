import {
  ADD_MEMBER,
  CLEAR_ERRORS,
  CLEAR_TARGET,
  EDIT_MEMBER,
  GET_MEMBER,
  MEMBER_ERROR,
  REMOVE_MEMBER,
} from '../reducers/types';
import React, { createContext, useReducer } from 'react';

import axios from 'axios';
import memberReducer from '../reducers/members.reducer.js';
import setAuthToken from '../utils/setAuthToken';

const initialState = {
  loading: true,
  error: null,
  target: null,
  members: [
    {
      id: null,
      name: null,
      phoneNum: null,
      gender: null,
      startDate: null,
      endDate: null,
      usedPT: null,
      totalPT: null,
      height: null,
    },
  ],
};

export const MembersContext = createContext();
export const DispatchContext = createContext();

export function MembersProvider(props) {
  const [state, dispatch] = useReducer(memberReducer, initialState);

  const changeVarName = (member) => {
    const memberObj = {};
    memberObj['name'] = member.Name;
    memberObj['id'] = member.MemberId;
    memberObj['phoneNum'] = member.PhoneNum;
    memberObj['gender'] = member.Gender;
    memberObj['startDate'] = member.StartDate;
    memberObj['endDate'] = member.EndDate;
    memberObj['usedPT'] = member.UsedPT;
    memberObj['totalPT'] = member.TotalPT;
    memberObj['height'] = member.Height;
    return memberObj;
  };

  // 작성일: 2019.08.11
  // 작성자: 박종열
  // 기능: 트레이너들의 회원목록(이름, 등록일, 마감일, 남은pt수) 가져오기, 정적 스케줄 가져오기
  const getMember = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const setting = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.get('/api/members/', setting);
      console.log('res.data', res.data);
      const members = res.data.map(cv => {
        return {
          id: cv.memberId,
          name: cv.name,
          phoneNum: cv.phoneNum,
          gender: cv.gender,
          startDate: cv.startDate,
          endDate: cv.endDate,
          usedPT: cv.usedPT,
          totalPT: cv.totalPT,
          height: cv.height,
        };
      });
      await dispatch({ type: GET_MEMBER, payload: members });
    } catch (err) {
      console.log(err);
    }
  };

  // 작성일: 2019.09.07
  // 작성자: 박종열
  // 기능: 맴버 추가
  const addMember = async formdata => {
    // name, startTime, endTime, phonenum, gender, totalPT, height
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post('/api/members/insertMember', formdata);
      if (res.data) {
        console.log('addMember_res.data', res.data);
        const addedMemebr = await changeVarName(res.data);
        dispatch({ type: ADD_MEMBER, payload: addedMemebr });
      } else {
        console.log('어떤 에러');
      }
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({ type: MEMBER_ERROR, payload: error.response.data.msg });
    }
  };

  const removeMember = async selectedRows => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post('/api/members/removeMember', selectedRows);
      if (res.data) {
        // 삭제된 row수
        console.log('removeMember', res.data);
        console.log('selectedRows', selectedRows);
        const members = res.data.map(cv => {
          return {
            id: cv.MemberId,
            name: cv.Name,
            phoneNum: cv.PhoneNum,
            gender: cv.Gender,
            startDate: cv.StartDate,
            endDate: cv.EndDate,
            usedPT: cv.UsedPT,
            totalPT: cv.TotalPT,
            height: cv.Height,
          };
        });
        dispatch({ type: REMOVE_MEMBER, payload: members });
      } else {
        console.log('어떤 에러');
      }
    } catch (error) {
      console.log(error.response.data.msg);
      // dispatch({ type: MEMBER_ERROR, payload: error.response.data.msg });
    }
  };

  const editMember = phoneNum => {
    dispatch({ type: EDIT_MEMBER, payload: phoneNum });
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  const clearTarget = () => dispatch({ type: CLEAR_TARGET });

  return (
    <MembersContext.Provider
      value={{
        members: state.members,
        getMember,
        addMember,
        removeMember,
        editMember,
        error: state.error,
        targetMember: state.target,
        clearErrors,
        clearTarget,
      }}
    >
        {props.children}
    </MembersContext.Provider>
  );
}
