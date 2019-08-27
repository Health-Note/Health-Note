import React, { createContext, useState } from 'react';

const ExerciseContext = createContext();
const idContext = createContext();

const ExerciseProvider = ( props ) => {

    const initialState = {

    }

    const [selectedExer, setSelectedExer] = useState(""); // () => {}
    const [id, setId] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState(""); 
    const [exercises, setExercises] = useState(null);
    
    async function getExercises() {
        const config = {
            method: 'GET',
        }
        try {
            let res = await fetch("/getAllExercise", config);
            let data = await res.json();
            setExercises(data);
            console.log("루틴 콘텍스트", exercises)
        } catch (err) {
            console.log(err);
        }
    }   
   
    return (
        <ExerciseContext.Provider 
            value={{
                selectedExer,
                setSelectedExer,
                id,
                setId,
                date,
                setDate,
                startTime,
                setStartTime,
                exercises,
                getExercises,
            }}
        >
            <idContext.Provider value={id}>
                {props.children}
            </idContext.Provider>
        </ExerciseContext.Provider>
    )
}

export { ExerciseProvider, ExerciseContext, idContext };


    