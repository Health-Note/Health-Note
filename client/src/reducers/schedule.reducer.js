const reducer = (state, action) => {
    switch(action.type) {
        case "TOGGLE":
                console.log(action.id)
            return state.map(schedule => 
                schedule.phonenum + schedule.date === action.id ? { ...schedule, finish_dncd: !schedule.finish_dncd } : schedule);
        case "DELETE":
            console.log(action.id)
               return state.filter(schedule => 
                action.id !== schedule.phonenum + schedule.date)
            
        default: 
            return state;
    }   
}

export default reducer;