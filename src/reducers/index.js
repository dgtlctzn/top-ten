import {combineReducers} from "redux";
import movieReducer from "./movieReducer";
import songReducer from "./songReducer"
// import { connectRouter } from 'connected-react-router'



const allReducers = combineReducers({
    movieReducer,
    songReducer,
    // router: connectRouter(history),
})

export default allReducers;