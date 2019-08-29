import { SET_ALERT, REMOVE_ALERT } from './types';

export default (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            console.log("셋얼러트 리듀서")
            return  [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.id);
        default:
            return state;
    }
}