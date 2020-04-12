import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from '../reducers/types';
import React, { createContext, useReducer } from 'react';

import authReducer from '../reducers/auth.reducer';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();
export const AuthProvider = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    trainer: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // 유저 로드
  // - 토큰을 글로벌 헤드에 담은 후 토큰에 담긴 email 정보를 통해 트레이너(유저) 전체 정보를 가져온다.
  // - 유저정보를 가져온 후 state에 담는다.
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth/me');
      await dispatch({ type: USER_LOADED, payload: res.data.user }); // payload는 찾은 trainer
      console.log('loadUser', res.data);
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTH_ERROR });
    }
  };

  // 유저 등록
  // - 회원가입 양식 데이터를 서버로 보낸다.
  // - 토큰을 받아온다.
  // - 성공일 경우 토큰을 state에 담고 에러일 경우 state.error에 에러 메세지를 담는다.
  const register = async formData => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth/signup', formData, config);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data }); // res.data = token
        console.log("register", res.data);
        loadUser();
    } catch (error) {
      console.log(error.response.data.msg);
      //console.log("error.response.data.errors", error.response.data.errors[0].msg)
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg }); // express-validatar에서 오는 에러
    }
  };

  // 유저 로그인
  const login = async formData => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth/signin', formData, config);
      if (res.status === 200 || res.status === 201) {
        // response.ok (200~299)
        console.log("login", res.data);
        await dispatch({ type: LOGIN_SUCCESS, payload: res.data }); // res.data = token
        await loadUser();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg }); // 로그인 실패시 자동으로 서버의 msg가 catch로 옴(axios의 경우만)
    }
  };

  // 유저 로그아웃
  const logout = () => dispatch({ type: LOGOUT });

  // 에러 초기화
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        trainer: state.trainer,
        error: state.error,
        clearErrors,
        register,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
