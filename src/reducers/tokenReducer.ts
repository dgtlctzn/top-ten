import {Action} from "../actions/actions"

const tokenReducer = (state = "", action: Action) => {
    switch(action.type) {
        case "ADD_TOKEN":
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default tokenReducer;