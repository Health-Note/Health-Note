import React, { createContext, useReducer } from "react";
import memberReducer from "../reducers/members.reducer.js";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  ADD_MEMBER,
  GET_MEMBER,
  REMOVE_MEMBER,
  EDIT_MEMBER,
  MEMBER_ERROR
} from "../reducers/types";

const initialState = {
  loading: true,
  error: null,
  members: [
    {
      id: null,
      name: null,
      phonenum: null,
      gender: null,
      start_date: null,
      end_date: null,
      usedpt: null,
      unusedpt: null,
      height: null
    }
  ]
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
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.get("/api/members/getMembers", setting);
      console.log("res.data", res.data);
      await dispatch({ type: GET_MEMBER, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  // 작성일: 2019.09.07
  // 작성자: 박종열
  // 기능: 맴버 추가
  const addMember = async formdata => {
    // name, start_date, end_date, phonenum, gender, unusedpt, height
    console.log("formdata", formdata);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post("/api/members/insertMember", formdata);
      if (res.data) {
        console.log("addMember_res.data", res.data);
        dispatch({ type: ADD_MEMBER, payload: res.data });
      } else {
        console.log("어떤 에러");
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
      const res = await axios.post("/api/members/removeMember", selectedRows);
      if (res.data) { // 삭제된 row수
        dispatch({ type: REMOVE_MEMBER, payload: selectedRows });
      } else {
        console.log("어떤 에러");
      }
    } catch (error) {
      console.log(error.response.data.msg);
      //dispatch({ type: MEMBER_ERROR, payload: error.response.data.msg });
    }
  };

  const editMember = phonenum => {
    dispatch({ type: EDIT_MEMBER, payload: phonenum });
  };

  return (
    <MembersContext.Provider
      value={{
        members: state.members,
        getMember,
        addMember,
        removeMember,
        editMember,
        error: state.error
      }}
    >
      <DispatchContext.Provider value={dispatch}>
        {" "}
        {/*dispatch를 계속해서 만들어내지 않게 객체형태로 보내지 않는다 */}
        {props.children}
      </DispatchContext.Provider>
    </MembersContext.Provider>
  );
}
