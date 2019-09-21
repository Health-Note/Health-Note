import { SET_FIXED_SCHEDULE, GET_FIXED_SCHEDULE } from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_FIXED_SCHEDULE:
      console.log('스케줄 리듀서_get_fixed_schedule', action.payload);
      return;
    case SET_FIXED_SCHEDULE:
      return [
        ...state,
        {
          title: action.payload.name,
          id: action.payload.member_id,
          start: action.payload.start_time,
        },
      ];
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
