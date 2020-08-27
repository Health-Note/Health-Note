import produce from 'immer';
import {
  GET_MEMBER_REQUEST,
  GET_MEMBER_SUCCESS,
  EDIT_MEMBER,
  MEMBER_ERROR,
  CLEAR_ERRORS,
  CLEAR_TARGET,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR,
  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,
} from './types';

export const initialState = {
  loading: true,
  error: null,
  target: null,
  members: [
    {
      id: null,
      memberName: null,
      phoneNum: null,
      gender: null,
      startDate: null,
      endDate: null,
      usedPT: null,
      totalPT: null,
      height: null,
    },
  ],
};

export const getMemberRequestAction = () => ({ type: GET_MEMBER_REQUEST });
export const addMemberRequestAction = (member) => ({ type: ADD_MEMBER_REQUEST, payload: member });
export const removeMemberRequestAction = (member) => ({ type: REMOVE_MEMBER_REQUEST, payload: member });
export const clearTargetAction = () => ({ type: CLEAR_TARGET });

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_MEMBER_SUCCESS:
        draft.loading = false;
        draft.members = action.payload; // 전체 멤버 (배열)
        break;
      case ADD_MEMBER_SUCCESS:
        draft.loading = false;
        draft.target = action.payload.memberName;
        draft.members.push(action.payload); // 멤버 추가 (배열안에 객체 추가)
        break;
      case REMOVE_MEMBER_SUCCESS:
        draft.loading = false;
        draft.target = 'deleted';
        draft.members = state.members.filter(member => !action.payload.includes(member.id)); // filter an array from all elements of another array
        break;
      case 'TOGGLE':
        draft.forEach(member => {
          if (member.id === action.id) {
            member.completed = !member.completed;
          }
        });
        break;
      case EDIT_MEMBER:
        draft.members.forEach(member => {
          if (member.id === action.id) {
            member.memberName = action.newName;
            member.phonenum = action.newPhoneNum;
            member.gender = action.newGender;
            member.totalPT = action.newTotalPT;
            member.startDate = action.newStartDate;
            member.endDate = action.newEndDate;
            member.height = action.newHeight;
          }
        });
        break;
      case ADD_MEMBER_ERROR:
      case MEMBER_ERROR:
        draft.error = action.payload;
        draft.members.forEach(member => {
          member.loading = false;
          member.target = null;
        });
        break;
      case CLEAR_ERRORS:
      case CLEAR_TARGET:
        draft.target = null;
        draft.error = null;
        break;
      default:
        return state;
    }
  });
};
export default reducer;
