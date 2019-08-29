
import React, { createContext, useReducer } from 'react';
import alertReducer from '../reducers/alert.reducer';
import uuid from 'uuid/v4'
import {
    REMOVE_ALERT,
    SET_ALERT 
} from '../reducers/types'

export const AlertContext = createContext();
export const AlertProvider = (props) => {

    const initialState =[];

    const [state, dispatch] = useReducer(alertReducer, initialState);
    
    // 얼럿 만들기
    const setAlert = (msg, type) => {
        console.log("셋 얼러트")
        const id = uuid();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        });
        // 얼럿 삭제
        setTimeout(() => dispatch({type: REMOVE_ALERT, id}), 3000);
    }

    return(
        <AlertContext.Provider value={{
           alerts: state,
           setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    );
};
