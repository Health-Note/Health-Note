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
            draft.selectedSchedule.id = action.payload.id;
            draft.selectedSchedule.memberId = action.payload.memberId;
            draft.schedules.forEach(schedule => {
              if (schedule.id === action.payload.id) {
                schedule.target = true;
                schedule.borderColor = 'red';
              } else {
                schedule.target = false;
                schedule.borderColor = 'white';
              }
            })
          });
        case GET_SCHEDULES:
          return produce(state, draft => {
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
          });
        case SET_SCHEDULE:
        case CREATE_ONE_SCHEDULE:
          return produce(state, draft => {
            draft.schedules.push(action.payload);
          });
        case UPDATE_SCHEDULE:
          return produce(state, draft => {
            draft.schedules.forEach(schedule => {
              if (schedule.id === action.payload.id) {
                  schedule.start = action.payload.startTime;
                  schedule.end = action.payload.endTime;
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
