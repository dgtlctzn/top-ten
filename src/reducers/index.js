import {combineReducers} from "redux";
import movieReducer from "./movieReducer";
import songReducer from "./songReducer"

const allReducers = combineReducers({
    movieReducer,
    songReducer,
})

export default allReducers;