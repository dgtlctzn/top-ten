import {combineReducers} from "redux";
import movieReducer from "./movieReducer";
import songReducer from "./songReducer";
import tokenReducer from "./tokenReducer";
import albumReducer from "./albumReducer";
import { connectRouter } from 'connected-react-router';



const allReducers = (history) => combineReducers({
    movieReducer,
    songReducer,
    tokenReducer,
    albumReducer,
    router: connectRouter(history),
})

export default allReducers;