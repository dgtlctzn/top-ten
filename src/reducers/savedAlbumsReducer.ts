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
    case "SEND_ALBUM_UP":
      state[action.payload.index].index--;
      state[action.payload.index - 1].index++;
      return [...state.sort((a, b) => a.index - b.index)];
    case "SEND_ALBUM_DOWN":
      state[action.payload.index].index++;
      state[action.payload.index + 1].index--;
      return [...state.sort((a, b) => a.index - b.index)];
    default:
      return state;
  }
};

export default savedAlbumsReducer;
