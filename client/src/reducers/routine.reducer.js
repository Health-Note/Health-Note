const reducer = (state, action) => {
    switch(action.type) {
        case "GETWEEK": // [{},{},{}]
            return { name: action.name, week: [...action.week] }
        case "DELETE":
               return state.filter(schedule => 
                action.id !== schedule.phonenum + schedule.date)
        default: 
            return state;
    }   
}

export default reducer;