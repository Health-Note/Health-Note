import React, { createContext, useReducer } from 'react';
import authReducer from '../reducers/auth.reducer';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR
} from '../reducers/types';

export const AuthContext = createContext();
export const AuthProvider = (props) => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        trainer: null,
        error: null
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
            const res = await axios.get("/api/auth");
            console.log(res.data);
            dispatch({ type: USER_LOADED, payload: res.data }); // payload는 찾은 trainer
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    }
    
    // 유저 등록
    const register = async formData => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post("/api/trainers", formData, config );
            if (res.status === 200 || res.status === 201) { // response.ok (200~299)
                dispatch({ type: REGISTER_SUCCESS, payload: res.data }) // res.data = token
                loadUser();
                console.log(res.data)
              } else {
                  dispatch({ type: REGISTER_FAIL, payload: res.data.msg })
                }
            } catch (error) {
                dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg })
            }
    }

    // 유저 로그인
    
    // 유저 로그아웃
    
    // 에러 초기화
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return(
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            trainer: state.trainer,
            error: state.error,
            clearErrors,
            register,
            loadUser
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

