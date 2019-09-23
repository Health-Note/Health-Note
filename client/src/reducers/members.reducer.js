import {
  ADD_MEMBER,
  GET_MEMBER,
  REMOVE_MEMBER,
  EDIT_MEMBER,
  MEMBER_ERROR,
  CLEAR_ERRORS,
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
        target: action.payload.name,
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
        members: [...action.payload],
        // const filter = action.payload.map(cv => cv.key); // 삭제된 회원의 phonenum만 받아옴
        // const deletedMembers = state.members.filter(member => {
        //   for (var value of filter) {
        //     if (member.phoneNum === value) {
        //       return false;
        //     }
        //   }
        //   return true;
        // });
        // return {
        //   ...state,
        //   members: deletedMembers,
        //   loading: false,
        // };
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
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
