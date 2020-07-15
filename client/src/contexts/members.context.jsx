import {
  ADD_MEMBER,
  CLEAR_ERRORS,
  CLEAR_TARGET,
  EDIT_MEMBER_DISPLAY,
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
  editing: false,
  error: null,
  target: null,
  members: [
    {
      id: null,
      memberName: null,
      phoneNum: null,
      gender: null,
      startDate: null,
      endDate: null,
      usedPT: null,
      totalPT: null,
      height: null,
      age: 0,
    },
  ],
};

export const MembersContext = createContext();
export const DispatchContext = createContext();

export function MembersProvider(props) {
  const [state, dispatch] = useReducer(memberReducer, initialState);

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
      const res = await axios.get('/api/members', setting);
      console.log('[context] getMember res.data', res.data);
      const members = res.data.map(cv => {
        return {
          id: cv.id,
          memberName: cv.memberName,
          phoneNum: cv.phoneNum,
          gender: cv.gender,
          startDate: cv.startDate,
          endDate: cv.endDate,
          usedPT: cv.usedPT,
          totalPT: cv.totalPT,
          height: cv.height,
          age: cv.age,
        };
      });
      console.log(members)
      await dispatch({ type: GET_MEMBER, payload: members });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @module members.context
   * @function
   * @desc 회원 추가
   * @param formdata {object} {memberName, age, startTime, endTime, phonenum, gender, totalPT, height}
   */

  const addMember = async formdata => {
    console.log('formdata', formdata)
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post('/api/schedules/initializing', formdata);
      console.log("res.data.id", res.data.id)
      if (res.status === 201) {
        const addedMember = {
          id: res.data.id,
          memberName: formdata.memberName,
          phoneNum: formdata.phoneNum,
          gender: formdata.gender,
          startDate: formdata.startDate,
          endDate: formdata.endDate,
          usedPT: 0,
          totalPT: formdata.totalPT,
          height: null,
          age: formdata.age,
        }
        dispatch({ type: ADD_MEMBER, payload: addedMember });
      } else {
        console.log('어떤 에러');
      }
    } catch (error) {
      console.log(error);
      // dispatch({ type: MEMBER_ERROR, payload: error.response.data.msg });
    }
  };

  /**
   * @module members.context
   * @function
   * @desc 회원 삭제
   * @param selectedRows {array} [{key, id, memberName, gender, phoneNum, totalPT, usedPT}, ...]
   * @res {Object} The JSON payload.
   */
  const removeMember = async selectedRows => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      console.log('[context] removeMember selectedRows', selectedRows);
      const ids = selectedRows.map(cv => {
        return cv.id
      });
      const strids = JSON.stringify(ids);
      console.log('[context] removeMember strids', strids);
      const res = await axios.delete(`/api/members/?ids=${strids}`);
      if (res.status === 204) {
        console.log('[context] removeMember res.data', res.data);
        dispatch({ type: REMOVE_MEMBER, payload: ids });
      } else {
        console.log('어떤 에러');
      }
    } catch (error) {
      console.log(error);
      // dispatch({ type: MEMBER_ERROR, payload: error.response.data.msg });
    }
  };

  const editMember = member => {
    console.log(member)
    dispatch({ type: EDIT_MEMBER_DISPLAY, payload: member });
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
        editing: state.editing,
      }}
    >
        {props.children}
    </MembersContext.Provider>
  );
}
