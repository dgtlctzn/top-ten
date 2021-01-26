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
      // const currList: Array<SavedItems> = [...state.slice(0, action.payload.index), ...state.slice(action.payload.index + 1)];
      const newList: Array<SavedItems | null> = [];
      const [reorderedItem] = state.splice(action.payload.index, 1);
      state.splice(action.payload.newIndex, 0, reorderedItem);
      // for (const item of currList) {
      //   if (item.index < action.payload.newIndex) {
      //     newList.push(item);
      //   } else if (item.index === action.payload.newIndex) {
      //     book.index = item.index;
      //     item.index++;
      //     newList.push(book)
      //     newList.push(item);
      //   } else {
      //     // item.index++;
      //     newList.push(item);
      //   }
      // }
      return state;
    default:
      return state;
  }
};

export default savedBooksReducer;
