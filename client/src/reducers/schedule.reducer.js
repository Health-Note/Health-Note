import produce from 'immer';
import {
  SET_SCHEDULE,
  GET_SCHEDULES,
  SET_SCHEDULE_TARGET,
  UPDATE_SCHEDULE,
  REMOVE_SHCEDULE,
  CREATE_ONE_SCHEDULE,
} from './types';

const reducer = (state, action) =>  {
      switch (action.type) {
        case SET_SCHEDULE_TARGET:
          return produce(state, draft => {
            draft.selectedSchedule.scheduleId = action.payload.scheduleId;
            draft.selectedSchedule.memberId = action.payload.memberId;
            draft.schedules.forEach(schedule => {
              if (schedule.id === action.payload.scheduleId) {
                schedule.target = true;
                schedule.borderColor = 'blue';
              } else {
                schedule.target = false;
                schedule.borderColor = 'white';
              }
            })
          });
        case GET_SCHEDULES:
          return produce(state, draft => {
            const allSchedules = action.payload;
            draft.schedules = allSchedules.reduce((acc, cv) => acc.concat(cv), []); // 이중배열 => 일차원배열
          });
        case SET_SCHEDULE:
        case CREATE_ONE_SCHEDULE:
          return produce(state, draft => {
            draft.schedules.push(action.payload);
          });
        case UPDATE_SCHEDULE:
          return produce(state, draft => {
            draft.schedules.forEach(schedule => {
              if (schedule.id === action.payload.ScheduleId) {
                  schedule.start = action.payload.StartTime
              }
            })
          });
        case 'TOGGLE':
          return state.map(schedule =>
              schedule.phonenum + schedule.date === action.id
                  ? {...schedule, finish_dncd: !schedule.finish_dncd}
                  : schedule
          );
        case REMOVE_SHCEDULE:
          return produce(state, draft => {
            draft.schedules = state.schedules.filter(
                schedule => parseInt(action.payload) !== schedule.id
            )
          });
        default:
          return state;
      }
    };

export default reducer;
