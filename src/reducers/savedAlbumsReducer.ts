import { SaveAction } from "../actions/actions";
import { SavedItems } from "../containers/Interfaces/Interfaces";

const savedAlbumsReducer = (
  state: Array<SavedItems> = [],
  action: SaveAction
) => {
  switch (action.type) {
    case "SAVE_ALBUMS":
      return [...state, action.payload];
    case "DEL_ALBUM":
      state = state
        .filter((album) => album.name !== action.payload.name)
        .map((album, index) => {
          album.index = index;
          return album;
        });
      return state;
      case "REORDER_ALBUM":
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

export default savedAlbumsReducer;
