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
    case "REORDER_BOOK":
      const book: SavedItems = state[action.payload.index];
      const firstPartList: Array<SavedItems> = state.slice(0, action.payload.index - 1);
      const lastPartList: Array<SavedItems> = state.slice(action.payload.index).map(item => {
        return {...item, index:item.index++};
      });
      // const currAlbum: SavedItems = action.payload;
      return [...firstPartList, book, ...lastPartList];
    default:
      return state;
  }
};

export default savedBooksReducer;
