import React, { useCallback, useContext, useEffect, useState } from 'react';
import ExerciseSelect from '../routine/ExerciseSelect';
import RoutineRow from './RoutineRow';
import { v4 as uuid } from 'uuid';
import { Button } from 'antd';
import RowHeader from './RowHeader';
import { RoutineContext } from '../../../../contexts/routine.context';
import { ScheduleContext } from '../../../../contexts/schedule.context';
import { MembersContext } from '../../../../contexts/members.context';

const Routine = () => {
  const { saveRoutines, routines, setRoutines, insertCount, deleteRoutine } = useContext(RoutineContext);
  const { targetSchedule } = useContext(ScheduleContext);
  const [updateRoutines, setUpdateRoutines] = useState([]);
  const [delExerCodes, setDelExerCodes] = useState(new Set());
  const [routineList, setRoutineList] = useState(null);

  useEffect(() => {
    setRoutineList(routines);
  }, [routines])

  // update routines 설정
  const getExerIdAndName = (exerciseCode, exerciseName, targetCode, targetName) => {
    setRoutines(exerciseCode, exerciseName, targetCode, targetName, targetSchedule);
  };

  // update routines에서 카운트와 세트수 설정
  const insertCounts = (exerciseCode, setCount, repetitions) => {
    insertCount(exerciseCode, setCount, repetitions)
  }

  // deleted exercode 설정
  const getDelExerCode = (exerciseCode) => {
    console.log(exerciseCode)
    // setDelExerCodes((prevState) => {
    //   return new Set(prevState).add(exerciseCode);
    // });
    // const routines = routines.filter(routine => routine.exerciseCode !== exerciseCode);
    // setUpdateRoutines(routines);
    deleteRoutine(exerciseCode);
  };

  const onClickSave = () => {
    saveRoutines(targetSchedule.id, delExerCodes);
  };

  return (
    <>
      <h2>{targetSchedule.memberName ? targetSchedule.memberName + "님의 운동루틴" : "루틴을 추가하려면 달력안의 멤버을 클릭하세요" }</h2>
      <ExerciseSelect getExerIdAndName={getExerIdAndName}/>
      <RowHeader/>
      {routineList && routineList.map(routine => {
        return (
          <>
            <RoutineRow key={routine.exerciseCode} routine={routine} insertCounts={insertCounts}
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
