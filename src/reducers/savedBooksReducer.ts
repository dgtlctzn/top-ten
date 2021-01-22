import { SaveAction } from "../actions/actions";
import { SavedItems } from "../containers/Interfaces/Interfaces";

const savedBooksReducer = (
  state: Array<SavedItems> = [],
  action: SaveAction
) => {
  switch (action.type) {
    case "SAVE_BOOKS":
      return [...state, action.payload];
    case "DEL_BOOK":
      state = state
        .filter((book) => book.name !== action.payload.name)
        .map((book, index) => {
          book.index = index;
          return book;
        });
      return state;
    case "SEND_BOOK_UP":
      state[action.payload.index].index--;
      state[action.payload.index - 1].index++;
      return [...state.sort((a, b) => a.index - b.index)];
    case "SEND_BOOK_DOWN":
      state[action.payload.index].index++;
      state[action.payload.index + 1].index--;
      return [...state.sort((a, b) => a.index - b.index)];
    default:
      return state;
  }
};

export default savedBooksReducer;
