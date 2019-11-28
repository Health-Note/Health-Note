import {
  SET_SCHEDULE,
  GET_SCHEDULES,
  SET_SCHEDULE_TARGET,
  UPDATE_SCHEDULE,
  REMOVE_SHCEDULE,
  CREATE_ONE_SCHEDULE,
} from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SCHEDULE_TARGET:
      return {
        selectedSchedule: {
          scheduleId: action.payload.scheduleId,
          memberId: action.payload.memberId,
        },
        schedules: state.schedules.map(schedule => {
          if (schedule.id === action.payload.scheduleId) {
            return {
              ...schedule,
              target: true,
              borderColor: 'blue',
            };
          } else {
            return {
              ...schedule,
              target: false,
              borderColor: 'white',
            };
          }
        }),
      };

    case GET_SCHEDULES:
      const allSchedules = action.payload;
      const schedules = allSchedules.reduce((acc, cv) => acc.concat(cv), []); // 이중배열 => 일차원배열
      return {
        ...state,
        schedules,
      };
    case SET_SCHEDULE:
    case CREATE_ONE_SCHEDULE:
      return {
        ...state,
        schedules: [...state.schedules, action.payload],
      };
    case UPDATE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.map(schedule => {
          if (schedule.id === action.payload.id) {
            console.log(schedule.id, action.payload.id)
            return {
              ...schedule,
              start: action.payload.startTime,
            };
          } else {
            return schedule;
          }
        }),
      };

    case 'TOGGLE':
      console.log(action.id);
      return state.map(schedule =>
        schedule.phonenum + schedule.date === action.id
          ? { ...schedule, finish_dncd: !schedule.finish_dncd }
          : schedule
      );
    case REMOVE_SHCEDULE:
      return {
        ...state,
        schedules: state.schedules.filter(
          schedule => parseInt(action.payload) !== schedule.id
        ),
      };
    default:
      return state;
  }
};

export default reducer;
