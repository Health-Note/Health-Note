import React, { createContext, useState } from 'react';
import Routine from '../components/routine/Routine'

const ExerciseContext = createContext();

const ExerciseProvider = ( props ) => {
    const [selectedExer, setSelectedExer] = useState(""); //() => {}

   
        return(
            <>
            <ExerciseContext.Provider value={[selectedExer, setSelectedExer]}>
                {props.children}
            </ExerciseContext.Provider>
        </>
    )
}

export { ExerciseProvider, ExerciseContext };


    