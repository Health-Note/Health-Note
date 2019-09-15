import moment from "moment";
import { SET_SCHEDULE, GET_SCHEDULES } from "./types";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_SCHEDULES:
      const allSchedules = action.payload;
      const result = allSchedules.reduce((acc, cv) => acc.concat(cv), []); // 이중배열 => 일차원배열
      //   for (let i = 0; i < allSchedules.length - 1; i++) {
      //     allSchedules[0].concat(allSchedules[i + 1]);
      // }
      console.log(result);
      return result;
    case SET_SCHEDULE:
      return [
        ...state,
        {
          ...action.payload
        }
      ];
    case "TOGGLE":
      console.log(action.id);
      return state.map(schedule =>
        schedule.phonenum + schedule.date === action.id
          ? { ...schedule, finish_dncd: !schedule.finish_dncd }
          : schedule
      );
    case "DELETE":
      console.log(action.id);
      return state.filter(
        schedule => action.id !== schedule.phonenum + schedule.date
      );

    default:
      return state;
  }
};

export default reducer;
