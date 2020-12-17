import {combineReducers} from "redux";
import movieReducer from "./movieReducer";
import savedAlbumsReducer from "./savedAlbumsReducer";
import tokenReducer from "./tokenReducer";
import albumReducer from "./albumReducer";
import savedMoviesReducer from "./savedMoviesReducer";
import { connectRouter } from 'connected-react-router';



const allReducers = (history) => combineReducers({
    movieReducer,
    savedAlbumsReducer,
    tokenReducer,
    albumReducer,
    savedMoviesReducer,
    router: connectRouter(history),
})

export default allReducers;