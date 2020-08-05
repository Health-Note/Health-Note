import {
  SET_DATE,
  GET_ROUTINES_SUCCESS,
  INSERT_COUNT,
  DELETE_ROUTINE,
  SET_UPDATE_ROUTINES, GET_ROUTINES_REQUEST, SAVE_ROUTINES_SUCCESS,
} from './types';

const initialState = {
  scheduleId: null,
  loaded:[],
  routines: [],
  deleteRoutine: []
}

export const getRoutinesAction = (scheduleId) => {
  return {
    type: GET_ROUTINES_REQUEST,
    payload: {scheduleId},
  }
}

export const setUpdateRoutinesAction = (exerciseCode, exerciseName, targetCode, targetName, targetSchedule) => {
  return {
    type: SET_UPDATE_ROUTINES,
    payload: {
      exerciseCode: parseInt(exerciseCode),
      exerciseName: exerciseName,
      targetCode: parseInt(targetCode),
      targetName: targetName,
      scheduleId: parseInt(targetSchedule.id),
      memberId: parseInt(targetSchedule.memberId),
      cardioTime: '00:00:00',
      maxWeight: 0,
    },
  };
};

export const insertCountAction = (exerciseCode, setCount, repetitions) => {
  return {
    type: INSERT_COUNT,
    payload: {exerciseCode, setCount, repetitions}
  }
}

export const deleteRoutineAction = (exerciseCode) => {
  return {
    type: DELETE_ROUTINE,
    payload: { exerciseCode }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, date: action.payload };
    case SAVE_ROUTINES_SUCCESS:
      return {
        ...state,
        loaded: action.payload.updateRoutine.map(cv => cv.exerciseCode),
        routines: [...action.payload.updateRoutine],
        deleteRoutine: []
      }
    case GET_ROUTINES_SUCCESS: // [{},{},{}]
      return {
        scheduleId: parseInt(action.payload.scheduleId),
        loaded: action.payload.routines.map(routine => routine.exerciseCode),
        routines: action.payload.routines.map(routine => ({
            cardioTime: routine.cardioTime,
            isCardio: routine.isCardio,
            routineOrder: routine.routineOrder,
            exerciseName: routine.exerciseName,
            targetName: routine.targetName,
            exerciseCode: parseInt(routine.exerciseCode),
            memberId: parseInt(routine.memberId),
            repetitions: parseInt(routine.weightTraining.repetitions),
            setCount: parseInt(routine.weightTraining.setCount),
            maxWeight: parseInt(routine.weightTraining.maxWeight),
            targetCode: parseInt(routine.weightTraining.targetCode),
        })),
        deleteRoutine: []
      };
    case SET_UPDATE_ROUTINES:
      return {
        scheduleId: action.payload.scheduleId,
        loaded: [...state.loaded],
        routines: [
          ...state.routines,
          {
            cardioTime: action.payload.cardioTime,
            isCardio: 0,
            routineOrder: 0,
            exerciseName: action.payload.exerciseName,
            targetName: action.payload.targetName,
            exerciseCode: parseInt(action.payload.exerciseCode),
            scheduleId: parseInt(action.payload.scheduleId),
            memberId: parseInt(action.payload.memberId),
            repetitions: parseInt(action.payload.repetitions),
            setCount: parseInt(action.payload.setCount),
            maxWeight: parseInt(action.payload.maxWeight),
            targetCode: parseInt(action.payload.targetCode),
          }],
        deleteRoutine: state.deleteRoutine.filter(cv => cv !== action.payload.exerciseCode),
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
        deleteRoutine: [...state.deleteRoutine]
      };
    case DELETE_ROUTINE:
      return {
        ...state,
        loaded: [...state.loaded],
        routines: state.routines.filter(routine => action.payload.exerciseCode !== routine.exerciseCode),
        deleteRoutine: state.loaded.includes(action.payload.exerciseCode) ?
          [...state.deleteRoutine, action.payload.exerciseCode] :
          [...state.deleteRoutine],
      }
    default:
      return state;
  }
};

export default reducer;
