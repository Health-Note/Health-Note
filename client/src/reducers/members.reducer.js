import {
  ADD_MEMBER,
  GET_MEMBER,
  REMOVE_MEMBER,
  EDIT_MEMBER,
  MEMBER_ERROR,
  CLEAR_ERRORS,
  CLEAR_TARGET,
} from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case GET_MEMBER:
      return {
        ...state,
        loading: false,
        members: [...action.payload], // 전체 멤버 (배열)
      };
    case ADD_MEMBER:
      return {
        ...state,
        loading: false,
        target: action.payload.Name,
        members: [
          {
            ...action.payload, // 멤버 추가 (배열안에 객체 추가)
          },
          ...state.members,
        ],
      };
    case REMOVE_MEMBER:
      return {
        ...state,
        loading: false,
        target: "deleted",
        members: [...action.payload],
      };

    case 'TOGGLE':
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
              phoneNum: action.newPhoneNum,
              gender: action.newGender,
              totalPT: action.newTotalPT,
              startDate: action.newStartDate,
              endDate: action.newEndDate,
              height: action.newHeight,
            }
          : member
      );
    case MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        target: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
    case CLEAR_TARGET:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
