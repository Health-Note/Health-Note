import {
  SET_DATE,
  GET_ROUTINES_SUCCESS,
  INSERT_COUNT,
  DELETE_ROUTINE,
  SET_UPDATE_ROUTINES,
  GET_ROUTINES_REQUEST,
  SAVE_ROUTINES_SUCCESS, CLEAR_ROUTINE,
} from './types';
import produce from 'immer';

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

// id = uuid/v4
export const setUpdateRoutinesAction = (id, exerciseCode, exerciseName, targetCode, targetName, selectedSchedule) => {
  console.log("selectedSchedule", selectedSchedule)
  return {
    type: SET_UPDATE_ROUTINES,
    payload: {
      id: id,
      exerciseCode: parseInt(exerciseCode),
      exerciseName: exerciseName,
      targetCode: parseInt(targetCode),
      targetName: targetName,
      scheduleId: parseInt(selectedSchedule.id),
      memberId: parseInt(selectedSchedule.memberId),
      cardioTime: '00:00:00',
      maxWeight: 0,
    },
  };
};

export const insertCountAction = (id, setCount, repetitions) => {
  return {
    type: INSERT_COUNT,
    payload: {id, setCount, repetitions}
  }
}

export const deleteRoutineAction = (id) => {
  return {
    type: DELETE_ROUTINE,
    payload: { id }
  }
}

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_DATE:
        draft.date = action.payload;
        break;
      case SAVE_ROUTINES_SUCCESS:
        draft.loaded = action.payload.updateRoutine.map(cv => cv.id);
        draft.routines = action.payload.updateRoutine;
        draft.deleteRoutine = [];
        break;
      case GET_ROUTINES_SUCCESS: // [{},{},{}]
        draft.scheduleId = parseInt(action.payload.scheduleId);
        draft.loaded = action.payload.routines.map(routine => routine.id);
        draft.routines = action.payload.routines.map(routine => ({
          id: routine.id,
          cardioTime: routine.cardioTime,
          isCardio: routine.isCardio,
          routineOrder: routine.routineOrder,
          exerciseName: routine.exercise.exerciseName,
          targetName: routine.exercise.targetName,
          exerciseCode: parseInt(routine.exerciseCode),
          memberId: parseInt(routine.memberId),
          repetitions: parseInt(routine.weightTraining.repetitions),
          setCount: parseInt(routine.weightTraining.setCount),
          maxWeight: parseInt(routine.weightTraining.maxWeight),
          targetCode: parseInt(routine.weightTraining.targetCode),
        }));
        draft.deleteRoutine = [];
        break;
      case SET_UPDATE_ROUTINES:
        draft.scheduleId = action.payload.scheduleId;
        draft.routines.push({
            id: action.payload.id,
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
          });
        draft.deleteRoutine = state.deleteRoutine.filter(cv => cv !== action.payload.id);
        break;
      case INSERT_COUNT:
        draft.routines = state.routines.map(routine => {
          if (routine.id === action.payload.id) {
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
        })
        break;
      case DELETE_ROUTINE:
        draft.routines = state.routines.filter(routine => action.payload.id !== routine.id);
        draft.deleteRoutine = state.loaded.includes(action.payload.id) ?
          [...state.deleteRoutine, action.payload.id] :
          [...state.deleteRoutine];
        break;
      case CLEAR_ROUTINE:
        draft.scheduleId = null;
        draft.loaded = [];
        draft.routines = [];
        draft.deleteRoutine = [];
        break;
      default:
        return state;
    }
  });
};

export default reducer;
