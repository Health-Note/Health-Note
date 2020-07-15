import produce from 'immer';
import {
  ADD_MEMBER,
  GET_MEMBER,
  REMOVE_MEMBER,
  EDIT_MEMBER_DISPLAY,
  MEMBER_ERROR,
  CLEAR_ERRORS,
  CLEAR_TARGET,
} from './types';

const reducer = (state, action) => {
  switch (action.type) {
      case GET_MEMBER:
        return produce(state, draft => {
          draft.loading = false;
          draft.members = action.payload; // 전체 멤버 (배열)
    });
    case ADD_MEMBER:
      return produce(state, draft => {
        draft.loading = false;
        draft.target = action.payload;
        draft.members.push(action.payload); // 멤버 추가 (배열안에 객체 추가)
      });
    case REMOVE_MEMBER:
      return produce(state, draft => {
        draft.loading = false;
        draft.target = action.payload;
        draft.members = state.members.filter(member => !action.payload.includes(member.id)); // filter an array from all elements of another array
      });
    case 'TOGGLE':
      return produce(state, draft => {
        draft.forEach(member => {
          if (member.id === action.id) {
            member.completed = !member.completed;
          }
        })
      });
    case EDIT_MEMBER_DISPLAY:
      return produce(state, draft => {
        draft.editing = true;
        draft.target = action.payload;
      });
    // case EDIT_MEMBER_REQUEST:
    //   return produce(state, draft => {
    //
    //   })
    // case EDIT_MEMBER_SUCCESS:
    //   return produce(state, draft => {
    //     draft.members.forEach(member => {
    //       if (member.id === action.payload.id) {
    //         member.memberName = action.payload.newName;
    //         member.phonenum = action.newPhoneNum;
    //         member.gender = action.newGender;
    //         member.totalPT = action.newTotalPT;
    //         member.startDate = action.newStartDate;
    //         member.endDate = action.newEndDate;
    //         member.height = action.newHeight;
    //       }
    //     })
    //   })


    case MEMBER_ERROR:
      return produce(state, draft => {
          draft.error = action.payload;
          draft.members.forEach(member => {
          member.loading = false;
          member.target = null;
        });
      });
    case CLEAR_ERRORS:
    case CLEAR_TARGET:
        return produce(state, draft => {
          draft.target = null;
          draft.error = null;
        });
    default:
      return state;
  }
};

export default reducer;
