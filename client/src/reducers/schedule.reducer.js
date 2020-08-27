import produce from 'immer';
import {
  SET_SCHEDULE,
  GET_SCHEDULES_SUCCESS,
  SET_SCHEDULE_TARGET,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_ERROR,
  REMOVE_SCHEDULE_SUCCESS,
  REMOVE_SCHEDULE_ERROR,
  SET_SCHEDULE_REQUEST,
  SET_SCHEDULE_SUCCESS,
  CREATE_ONE_SCHEDULE_SUCCESS,
  CLEAR_SELECTED_SCHEDULE,
  CREATE_ONE_SCHEDULE_REQUEST,
  REMOVE_SCHEDULE_REQUEST,
} from './types';
import seedColors from '../utils/seedColors';

const initialState = {
  selectedSchedule: {
    id: null,
    memberId: null,
  },
  schedules: [
    {
      title: null, // memberName
      id: null,
      start: null,
      end: null,
      color: null,
      finish_dncd: false,
      target: null,
      borderColor: null,
      memberId: null,
    },
  ],
  isChanging: false,
};

export const changeScheduleAction = (id, afterDate, startTime, endTime, memberId) => {
  return {
    type: UPDATE_SCHEDULE_REQUEST, payload: { id, afterDate, startTime, endTime, memberId },
  };
};

export const setScheduleTargetAction = (id, memberId, memberName) => {
  return {
    type: SET_SCHEDULE_TARGET,
    payload: { id, memberId, memberName },
  };
};

export const createScheduleAction = (memberId, memberName, startTime, endTime, isFinish, day) => {
  return {
    type: CREATE_ONE_SCHEDULE_REQUEST,
    payload: { memberId, memberName, startTime, endTime, isFinish, day },
  };
};

export const removeScheduleAction = (id, memberId) => {
  return {
    type: REMOVE_SCHEDULE_REQUEST,
    payload: { id, memberId },
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_SCHEDULE_TARGET:
        draft.selectedSchedule.id = action.payload.id;
        draft.selectedSchedule.memberId = action.payload.memberId;
        draft.selectedSchedule.memberName = action.payload.memberName;
        draft.schedules.forEach(schedule => {
          if (schedule.id === action.payload.id) {
            schedule.target = true;
            schedule.borderColor = 'red';
          } else {
            schedule.target = false;
            schedule.borderColor = 'white';
          }
        });
        break;
      case GET_SCHEDULES_SUCCESS:
        const allSchedules = action.payload.data;
        const seedColors = action.payload.seedColors;
        let colorIdx = 0;
        draft.schedules = allSchedules.map((cv, i) => {
          if (i < allSchedules.length - 1 && cv.id !== allSchedules[i + 1].id) {
            colorIdx++;
          }
          return {
            title: cv.memberName,
            id: cv.schedules.id,
            start: cv.schedules.day + ' ' + cv.schedules.startTime,
            end: cv.schedules.day + ' ' + cv.schedules.endTime,
            color: seedColors[1].colors[colorIdx].color,
            memberId: cv.id,
          };
        });
        // reduce((acc, cv) => acc.concat(cv), []); // 이중배열 => 일차원배열
        break;
      case SET_SCHEDULE_SUCCESS:
      case CREATE_ONE_SCHEDULE_SUCCESS:
        draft.schedules.push({
          title: action.payload.title,
          id: action.payload.id,
          start: action.payload.day + ' ' + action.payload.start,
          end: action.payload.end,
          memberId: action.payload.memberId,
          color: state.schedules.find(cv => cv.memberId == action.payload.memberId).color,
        });
        break;
      case UPDATE_SCHEDULE_SUCCESS:
        draft.schedules.forEach(schedule => {
          if (schedule.id === action.payload.id) {
            schedule.start = action.payload.startTime;
            schedule.end = action.payload.endTime;
          }
        });
        break;
      case 'TOGGLE':
        return state.map(schedule =>
          schedule.phonenum + schedule.date === action.id
            ? { ...schedule, finish_dncd: !schedule.finish_dncd }
            : schedule,
        );
      case REMOVE_SCHEDULE_SUCCESS:
        draft.schedules = state.schedules.filter(
          schedule => parseInt(action.payload.id) !== schedule.id,
        );
        break;
      case CLEAR_SELECTED_SCHEDULE:
        draft.selectedSchedule = {};
        break;
      default:
        return state;
    }
  });
};
export default reducer;
