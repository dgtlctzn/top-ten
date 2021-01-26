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
    case "REORDER_MOVIE":
      const [reorderedItem]: Array<SavedItems> = state.splice(
        action.payload.index,
        1
      );
      state.splice(action.payload.newIndex, 0, reorderedItem);
      const newList: Array<SavedItems | null> = state.map((item, index) => {
        return { ...item, index: index };
      });
      return newList;
    default:
      return state;
  }
};

export default savedMoviesReducer;
