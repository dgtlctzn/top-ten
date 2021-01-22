import {Action} from "../actions/actions"

const searchReducer = (state = "", action: Action) => {
    switch(action.type) {
        case "SET_SEARCH":
            // state = ;
            return action.payload;
        default:
            return state;
    }
}

export default searchReducer;