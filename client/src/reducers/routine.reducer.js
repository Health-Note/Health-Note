import { SET_DATE, GET_ROUTINES, SET_ROUTINES, INSERT_COUNT, DELETE_ROUTINE } from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, date: action.payload };
    case GET_ROUTINES: // [{},{},{}]
      return {
        scheduleId: action.scheduleId,
        loaded: action.payload.map(routine => routine.exerciseCode),
        routines: action.payload.map(routine => ({
            cardioTime: routine.cardioTime,
            isCardio: routine.isCardio,
            routineOrder: routine.routineOrder,
            exerciseName: routine.exerciseName,
            targetName: routine.targetName,
            exerciseCode: routine.exerciseCode,
            memberId: routine.memberId,
            repetitions: routine.weightTraining.repetitions,
            setCount: routine.weightTraining.setCount,
            maxWeight: routine.weightTraining.maxWeight,
            targetCode: routine.weightTraining.targetCode,
        })),
        deletedCode: []
      };
    case SET_ROUTINES:
      return {
        ...state,
        loaded: [...state.loaded],
        routines: [
          ...state.routines,
          {
            cardioTime: action.payload.cardioTime,
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
        deletedCode: state.deletedCode.filter(cv => cv !== action.payload.exerciseCode),
      };
    case INSERT_COUNT:
      return {
        ...state,
        loaded: [...state.loaded],
        routines: state.routines.map(routine => {
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
        }),
        deletedCode: [...state.deletedCode]
      };
    case DELETE_ROUTINE:
      return {
        ...state,
        loaded: [...state.loaded],
        routines: state.routines.filter(routine => action.payload.exerciseCode !== routine.exerciseCode),
        deletedCode: state.loaded.includes(action.payload.exerciseCode) ? [...state.deletedCode, action.payload.exerciseCode]: [...state.deletedCode],
      }
    default:
      return state;
  }
};

export default reducer;
