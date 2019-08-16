import React, { createContext, useReducer, useEffect } from 'react';
import routineReducer from '../reducers/routine.reducer.js';

export const RoutineContext = createContext();
export const DispatchContext = createContext();

export const RoutineProvider = (props) => {

    const [routine, dispatch] = useReducer(routineReducer, { name: "park", week: [{ day: 0, dayRoutines: ["1", "2", "3"]}] });
    return(
        <RoutineContext.Provider value={ routine }>
            <DispatchContext.Provider value={ dispatch }> {/*dispatch를 계속해서 만들어내지 않게 객체형태로 보내지 않는다 */}
                {props.children}
            </DispatchContext.Provider>
        </RoutineContext.Provider>
    )
}







    
    

