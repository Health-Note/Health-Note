import React, { useCallback, useState } from 'react';
import ExerciseSelect from '../routine/ExerciseSelect';
import RoutineRow from './RoutineRow';
import { v4 as uuid } from 'uuid';
import { Button } from 'antd';
import RowHeader from './RowHeader';

const Routine = ({ saveRoutines }) => {
  const [updateRoutines, setUpdateRoutines] = useState([]);
  const [delExerCodes, setDelExerCodes] = useState(new Set());

  // update routines 설정
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

  // update routines에서 카운트와 세트수 설정
  const insertCounts = useCallback((uuid, setCount, repetitions) => {
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
  }, [updateRoutines]);

  // deleted exercode 설정
  const getDelExerCode = (exerciseCode) => {
    setDelExerCodes((prevState) => {
      return new Set(prevState).add(exerciseCode);
    });
    const routines = updateRoutines.filter(routine => routine.exerciseCode !== exerciseCode);
    setUpdateRoutines(routines);
  };

  const onClickSave = () => {
    saveRoutines(delExerCodes, updateRoutines);
  };

  return (
    <>
      <ExerciseSelect getExerIdAndName={getExerIdAndName}/>
      <RowHeader/>
      {updateRoutines.map(routine => {
        return (
          <>
            <RoutineRow key={routine.uuid} routine={routine} insertCounts={insertCounts}
                        getDelExerCode={getDelExerCode}/>
          </>
        );
      })
      }
      <Button onClick={onClickSave} style={{marginTop: 10, width: '100%'}}>저장</Button>
    </>
  );
};

export default Routine;
