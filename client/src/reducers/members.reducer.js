import uuid from 'uuid/v4'

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD":
            return [...state, { 
                id: uuid(), 
                name: action.newName, 
                phonenum: action.newPhoneNum,  
                gender: action.newGender,
                unusedpt: action.newUnusedpt,
                startDate: action.newStartDate,
                endDate: action.newEndDate,
                height: action.newHeight,
            }]; 
        case "REMOVE":
            return state.filter(member => 
                member.id !== action.id);
        case "TOGGLE":
            return state.map(member => 
                member.id === action.id ? { ...member, completed: !member.completed } : member);            
        case "EDIT":
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