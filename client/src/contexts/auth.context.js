import React, { createContext, useReducer } from 'react';
import authReducer from '../reducers/auth.reducer';

export const AuthContext = createContext();
export const AuthProvider = (props) => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
    
    // 유저 로드
    
    // 유저 등록
    
    // 유저 로그인
    
    // 유저 로그아웃
    
    // 에러 초기화

    return(
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

