const reducer = (state, action) => {
    switch(action.type) {
        case "TOGGLE":
                console.log(action.id)
            return state.map(schedule => 
                schedule.phoneNum === action.id ? { ...schedule, finish_dncd: !schedule.finish_dncd } : schedule);            
        default: 
            return state;
    }   
}

export default reducer;