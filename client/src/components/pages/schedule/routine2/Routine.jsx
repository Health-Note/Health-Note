import React, { useState } from 'react';
import ExerciseSelect from '../routine/ExerciseSelect';
import RoutineList from '../routine/RoutineList';
import { v4 as uuid } from 'uuid';
import { Button } from 'antd';

const Routine = ({ saveRoutines }) => {
  const [updateRoutines, setUpdateRoutines] = useState([]);
  const [delExerCode, setDelExerCode] = useState([]);

  const getExerIdAndName = (exerciseCode, exerciseName, targetCode, targetName) => {
    setUpdateRoutines(prevState => ([
      ...prevState,
      {
        uuid: uuid(),
        exerciseCode: exerciseCode,
        exerciseName: exerciseName,
        targetCode: targetCode,
        targetName: targetName,
        isCardio: 0,
        setCount: 0,
        repetitions: 0,
        maxWeight: 0,
      },
    ]));
  };

  const insertCounts = (uuid, setCount, repetitions) => {
    const result = updateRoutines.map(routine => {
      if (routine.uuid === uuid) {
        return {
          ...routine,
          setCount: setCount,
          repetitions: repetitions,
        };
      } else {
        return {
          ...routine,
        };
      }
    });
    setUpdateRoutines(result);
  };

  const getDelExerCode = (exerciseCode) => {
    setDelExerCode([...delExerCode, exerciseCode]);
  };

  const onClickSave = () => {
    saveRoutines(delExerCode, updateRoutines);
  };

  return (
    <>
      <ExerciseSelect getExerIdAndName={getExerIdAndName}/>
      {updateRoutines.map(routine => {
        return (
          <>
            <RoutineList key={routine.uuid} routine={routine} insertCounts={insertCounts}
                         getDelExerCode={getDelExerCode}/>
          </>
        );
      })
      }
      <Button onClick={onClickSave}>저장</Button>
    </>
  );
};

export default Routine;
