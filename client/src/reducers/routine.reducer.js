import { SET_DATE, GET_ROUTINE, SET_ROUTINE } from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, date: action.payload };
    case GET_ROUTINE: // [{},{},{}]
      return { name: action.name };
    case SET_ROUTINE:
      return{

      }
    case 'DELETE':
      return state.filter(
        schedule => action.id !== schedule.phonenum + schedule.date
      );
    default:
      return state;
  }
};

export default reducer;
