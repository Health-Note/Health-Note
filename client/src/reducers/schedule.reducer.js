const reducer = (state, action) => {
    switch(action.type) {
        case "TOGGLE":
            return state.map(schedule => 
                schedule.id === action.id ? { ...schedule, finish_dncd: !schedule.finish_dncd } : schedule);            
        default: 
            return state;
    }   
}

export default reducer;