import React, { createContext, useReducer } from 'react';
import authReducer from '../reducers/auth.reducer';
import { log } from 'util';
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS
} from '../reducers/types'

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
    
    // 유저 등록
    const register = async formData => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        try {
            const res = await fetch("/api/trainers", config);
            const data = await res.json(); // token
            if (res.status === 200 || res.status === 201) { // response.ok (200~299)
                dispatch({ type: REGISTER_SUCCESS, payload: data })
              } else {
                  console.error(res.statusText);
                  dispatch({ type: REGISTER_FAIL, payload: data.msg })
                }
                console.log("token", data)
            } catch (error) {
                dispatch({ type: REGISTER_FAIL, payload: error })
                console.log(error)
            }
    }
    // 유저 로드
    
    // 유저 로그인
    
    // 유저 로그아웃
    
    // 에러 초기화
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

    return(
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            trainer: state.trainer,
            error: state.error,
            clearErrors,
            register
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

