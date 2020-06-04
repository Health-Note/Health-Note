import React, { useState } from 'react';
import ExerciseSelect from '../routine/ExerciseSelect';
import RoutineList from '../routine/RoutineList';

const Routine = () => {
  const [routines, setRoutines] = useState([]);

  const getExerIdAndName = (exerciseCode, exerciseName, targetCode, targetName) => {
    setRoutines(prevState => ([
      ...prevState,
      {
        exerciseCode,
        exerciseName,
        targetCode,
        targetName,
      },
    ]));
  };

  return (
    <>
      <ExerciseSelect getExerIdAndName={getExerIdAndName}/>
      <RoutineList routines={routines}/>
    </>
  );
};

export default Routine;
