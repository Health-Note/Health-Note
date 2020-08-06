import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import ExerciseSelect from '../routine/ExerciseSelect';
import { v4 as uuid } from 'uuid';
import RoutineRow from './RoutineRow';
import RowHeader from './RowHeader';
import {
  setUpdateRoutinesAction,
  insertCountAction,
  deleteRoutineAction,
} from '../../../../reducers/routine.reducer';
import { SAVE_ROUTINES_REQUEST } from '../../../../reducers/types';
import { v4 as uuidv4 } from 'uuid';

const Routine = () => {
  const dispatch = useDispatch();
  const { selectedSchedule } = useSelector(state => state.schedule)
  const { routines, deleteRoutine, scheduleId } = useSelector(state => state.routine)

  // update routines 설정
  const getExerIdAndName = useCallback((exerciseCode, exerciseName, targetCode, targetName) => {
    dispatch(setUpdateRoutinesAction(uuidv4(), exerciseCode, exerciseName, targetCode, targetName, selectedSchedule));
  }, []);

  // update routines에서 카운트와 세트수 설정
  const insertCounts = useCallback((id, setCount, repetitions) => {
    dispatch(insertCountAction(id, repetitions));
  }, []);

  // deleted exercode 설정
  const getDelExerCode = useCallback((id) => {
    console.log(id)
    // setDelExerCodes((prevState) => {
    //   return new Set(prevState).add(exerciseCode);
    // });
    // const routines = routines.filter(routine => routine.exerciseCode !== exerciseCode);
    // setUpdateRoutines(routines);
    dispatch(deleteRoutineAction(id));
  }, []);

  const onClickSave = () => {
    const finalRoutine = {
      scheduleId: parseInt(selectedSchedule.id),
      updateRoutine: routines.map(routine => {
        return {
          id: routine.id,
          exerciseCode: routine.exerciseCode,
          routineOrder: routine.routineOrder,
          memberId: routine.memberId,
          isCardio: routine.isCardio,
          cardioTime: routine.cardioTime,
          setCount: routine.setCount,
          repetitions: routine.repetitions,
          targetCode: routine.targetCode,
          maxWeight: 0,
        };
      }),
      deleteRoutine: deleteRoutine,
    };
    dispatch({ type: SAVE_ROUTINES_REQUEST, payload: finalRoutine });
  };

  return (
    <>
      <h2>{selectedSchedule.memberName ? selectedSchedule.memberName + "님의 운동루틴" : "루틴을 추가하려면 달력안의 멤버을 클릭하세요" }</h2>
      <ExerciseSelect getExerIdAndName={getExerIdAndName}/>
      <RowHeader/>
      {routines.length > 0 && routines.map(routine => {
        return (
          <>
            <RoutineRow key={routine.exerciseCode} routine={routine} scheduleId={scheduleId} insertCounts={insertCounts}
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
