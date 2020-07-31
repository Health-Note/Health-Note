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

export function MembersProvider(props) {
  const [state, dispatch] = useReducer(memberReducer, initialState);


  /**
   * @module members.context
   * @function
   * @desc 회원 추가
   * @param formdata {object} {memberName, age, startTime, endTime, phonenum, gender, totalPT, height}
   */

  const addMember = async formdata => {

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
