import { SET_DATE, GET_ROUTINE, SET_ROUTINE } from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, date: action.payload };
    case GET_ROUTINE: // [{},{},{}]
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
    case SET_ROUTINE:
      return{

      };
    case 'DELETE':
      return state.filter(
        schedule => action.id !== schedule.phonenum + schedule.date
      );
    default:
      return state;
  }
};

export default reducer;
