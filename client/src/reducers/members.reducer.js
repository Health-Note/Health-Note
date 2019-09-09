import uuid from 'uuid/v4';
import {
    ADD_MEMBER,
    GET_MEMBER,
    REMOVE_MEMBER,
    EDIT_MEMBER 
} from './types'; 

const reducer = (state, action) => {
    switch(action.type) {
        case GET_MEMBER: 
        console.log(action.payload);
            return {
                ...state,
                loading: false,
                members: [...action.payload] // 전체 멤버 (배열)
            }
        case ADD_MEMBER:
            return {
                ...state,
                loading: false,  
                members: [
                    {
                        ...action.payload // 멤버 추가 (배열안에 객체 추가)
                    },
                    ...state.members,
                ]
            }; 
        case REMOVE_MEMBER :
            return {
                ...state,
                members: state.members.filter(
                    member => member.phonenum !== action.payload
                ),
                loading: false
            }
        case "TOGGLE":
            return state.map(member => 
                member.id === action.id ? { ...member, completed: !member.completed } : member);            
        case EDIT_MEMBER:
            return state.map(member =>
                 member.id === action.id ? {
                    ...member,
                    name: action.newName,
                    phonenum: action.newPhoneNum,
                    gender: action.newGender, 
                    unusedpt: action.newUnusedpt,
                    startDate: action.newStartDate,
                    endDate: action.newEndDate,
                    height: action.newHeight,
                }
                :  member);       
        default: 
            return state;
    }   
}

export default reducer;