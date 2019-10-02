import { SET_SCHEDULE, GET_SCHEDULES, SET_SCHEDULE_TARGET } from './types';

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
      return {
        ...state,
        schedules: [...state.schedules, ...action.payload],
      };
    case 'TOGGLE':
      console.log(action.id);
      return state.map(schedule =>
        schedule.phonenum + schedule.date === action.id
          ? { ...schedule, finish_dncd: !schedule.finish_dncd }
          : schedule
      );
    case 'DELETE':
      console.log(action.id);
      return state.filter(
        schedule => action.id !== schedule.phonenum + schedule.date
      );

    default:
      return state;
  }
};

export default reducer;
