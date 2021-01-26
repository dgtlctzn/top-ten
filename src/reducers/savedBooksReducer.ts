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
    case "REORDER_BOOK":
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

export default savedBooksReducer;
