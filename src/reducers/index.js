import {combineReducers} from "redux";
import movieReducer from "./movieReducer";
import savedAlbumsReducer from "./savedAlbumsReducer";
import tokenReducer from "./tokenReducer";
import albumReducer from "./albumReducer";
import savedMoviesReducer from "./savedMoviesReducer";
import bookReducer from "./bookReducer";
import savedBooksReducer from "./savedBooksReducer";
import searchReducer from "./searchReducer";
import alertReducer from "./alertReducer";
import searchStatusReducer from "./searchStatusReducer"
import { connectRouter } from 'connected-react-router';



const allReducers = (history) => combineReducers({
    movieReducer,
    savedAlbumsReducer,
    tokenReducer,
    albumReducer,
    savedMoviesReducer,
    bookReducer,
    savedBooksReducer,
    searchReducer,
    alertReducer,
    searchStatusReducer,
    router: connectRouter(history),
})

export default allReducers;