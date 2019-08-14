import React, { createContext, useState } from 'react';

const ExerciseContext = createContext();
const idContext = createContext();

const ExerciseProvider = ( props ) => {

    const [selectedExer, setSelectedExer] = useState(""); //() => {}
    const [id, setId] = useState("");
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("") 
    
   
    return (
            <ExerciseContext.Provider value={{selectedExer, setSelectedExer, id, setId, date, setDate, startTime, setStartTime}}>
                <idContext.Provider  value={id}>
                    {props.children}
                </idContext.Provider>
            </ExerciseContext.Provider>
    )
}

export { ExerciseProvider, ExerciseContext, idContext };


    