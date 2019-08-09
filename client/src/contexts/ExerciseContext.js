import React, { createContext, useState } from 'react';
import Routine from '../components/routine/Routine'

const ExerciseContext = createContext();

const ExerciseProvider = ( props ) => {

    const [selectedExer, setSelectedExer] = useState(""); //() => {}
    const [id, setId] = useState("");
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("") 
    
   
    return (
        <>
            <ExerciseContext.Provider value={{selectedExer, setSelectedExer, id, setId, date, setDate, startTime, setStartTime}}>
                {props.children}
            </ExerciseContext.Provider>
        </>
    )
}

export { ExerciseProvider, ExerciseContext };


    