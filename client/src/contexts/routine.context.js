import React, { createContext, useReducer, } from 'react';
import routineReducer from '../reducers/routine.reducer.js';

export const RoutineContext = createContext();
export const DispatchContext = createContext();

export const RoutineProvider = (props) => {
    const initialState = {
        name: null,
        week: null,
        exercises: null,
        error: null,
        recentWorkOut: null
    };
    
    const [recentWorkOut, dispatch] = useReducer(routineReducer, null);
 
    return(
        <RoutineContext.Provider value={{ recentWorkOut }}>
            <DispatchContext.Provider value={ dispatch }> {/* dispatch를 계속해서 만들어내지 않게 객체형태로 보내지 않는다 */}
                { props.children }
            </DispatchContext.Provider>
        </RoutineContext.Provider>
    )
}