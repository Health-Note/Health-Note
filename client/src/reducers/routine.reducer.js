import { SET_DATE, GET_ROUTINES, SET_ROUTINES, INSERT_COUNT } from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, date: action.payload };
    case GET_ROUTINES: // [{},{},{}]
      return {
        loaded: action.payload.map(routine => routine.exerciseCode),
        routines: action.payload.map(routine => ({
          routines: {
            cardioTime: routine.cardioTime,
            isCardio: routine.isCardio,
            routineOrder: routine.routineOrder,
            exerciseName: routine.exerciseName,
            targetName: routine.targetName,
            exerciseCode: routine.exerciseCode,
            scheduleId: routine.scheduleId,
            memberId: routine.memberId,
            repetitions: routine.weightTraining.repetitions,
            setCount: routine.weightTraining.setCount,
            maxWeight: routine.weightTraining.maxWeight,
            targetCode: routine.weightTraining.targetCode,
          },
        })),
      };
    case SET_ROUTINES:
      return {
        ...state,
        routines: [
          ...state.routines,
          {
            cardioTime: '0',
            isCardio: 0,
            routineOrder: 0,
            exerciseName: action.payload.exerciseName,
            targetName: action.payload.targetName,
            exerciseCode: action.payload.exerciseCode,
            scheduleId: action.payload.scheduleId,
            memberId: action.payload.memberId,
            repetitions: action.payload.repetitions,
            setCount: action.payload.setCount,
            maxWeight: action.payload.maxWeight,
            targetCode: action.payload.targetCode,
          }],
      };
    case INSERT_COUNT:
      return state.routines.map(routine => {
          if (routine.exerciseCode === action.payload.exerciseCode) {
            return {
              ...routine,
              setCount: action.payload.setCount,
              repetitions: action.payload.repetitions,
            };
          } else {
            return {
              ...routine,
            };
          }
        });
    case 'DELETE':
      return state.routines.filter(
        schedule => action.id !== schedule.phonenum + schedule.date
      );
    default:
      return state;
  }
};

export default reducer;
