import { SET_DATE, GET_ROUTINES, SET_ROUTINES, INSERT_COUNT } from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, date: action.payload };
    case GET_ROUTINES: // [{},{},{}]
          return action.payload.map(routine => ({
            cardioTime: routine.cardioTime,
            isCardio: routine.isCardio,
            routineOrder: routine.routineOrder,
            exerciseCode: routine.exerciseCode,
            scheduleId: routine.scheduleId,
            memberId: routine.memberId,
            repetitions: routine.weightTraining.repetitions,
            setCount: routine.weightTraining.setCount,
            maxWeight: routine.weightTraining.maxWeight,
            targetCode: routine.weightTraining.targetCode,
          }));
    case SET_ROUTINES:
      return[
        ...state,
        {
          cardioTime: '0',
          isCardio: 0,
          routineOrder: 0,
          exerciseCode: action.payload.exerciseCode,
          scheduleId: action.payload.scheduleId,
          memberId: action.payload.memberId,
          repetitions: action.payload.repetitions,
          setCount: action.payload.setCount,
          maxWeight: action.payload.maxWeight,
          targetCode: action.payload.targetCode,
      }];
    case 'DELETE':
      return state.filter(
        schedule => action.id !== schedule.phonenum + schedule.date
      );
    default:
      return state;
  }
};

export default reducer;
