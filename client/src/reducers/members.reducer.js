import {
  ADD_MEMBER,
  GET_MEMBER,
  REMOVE_MEMBER,
  EDIT_MEMBER,
  MEMBER_ERROR
} from "./types";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_MEMBER:
      return {
        ...state,
        loading: false,
        members: [...action.payload] // 전체 멤버 (배열)
      };
    case ADD_MEMBER:
      return {
        ...state,
        loading: false,
        members: [
          {
            ...action.payload // 멤버 추가 (배열안에 객체 추가)
          },
          ...state.members
        ]
      };
    case REMOVE_MEMBER:
      const filter = action.payload.map(cv => cv.key);
      const deletedMembers = state.members.filter(member => {
        for (var value of filter) {
          if (member.phonenum === value) {
            return false;
          }
        }
        return true;
      });
      return {
        ...state,
        members: deletedMembers,
        loading: false
      };

    case "TOGGLE":
      return state.map(member =>
        member.id === action.id
          ? { ...member, completed: !member.completed }
          : member
      );
    case EDIT_MEMBER:
      return state.map(member =>
        member.id === action.id
          ? {
              ...member,
              name: action.newName,
              phonenum: action.newPhoneNum,
              gender: action.newGender,
              unusedpt: action.newUnusedpt,
              startDate: action.newStartDate,
              endDate: action.newEndDate,
              height: action.newHeight
            }
          : member
      );
    case MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
