import { SaveAction } from "../actions/actions";
import { SavedItems } from "../containers/Interfaces/Interfaces";

const savedMoviesReducer = (
  state: Array<SavedItems> = [],
  action: SaveAction
) => {
  switch (action.type) {
    case "SAVE_MOVIES":
      return [...state, action.payload];
    case "DEL_MOVIE":
      state = state
        .filter((movie) => movie.name !== action.payload.name)
        .map((movie, index) => {
          movie.index = index;
          return movie;
        });
      return state;
    case "SEND_MOVIE_UP":
      state[action.payload.index].index--;
      state[action.payload.index - 1].index++;
      return [...state.sort((a, b) => a.index - b.index)];
    case "SEND_MOVIE_DOWN":
      state[action.payload.index].index++;
      state[action.payload.index + 1].index--;
      return [...state.sort((a, b) => a.index - b.index)];
    default:
      return state;
  }
};

export default savedMoviesReducer;
