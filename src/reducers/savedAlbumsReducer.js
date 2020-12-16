const savedAlbumsReducer = (state = [], action) => {
  switch (action.type) {
    case "SAVE_ALBUMS":
      return [...state, action.payload];
    case "DEL_ALBUM":
      state = state.filter((album) => album.name !== action.payload.name);
      return state;
    case "SEND_ALBUM_UP":
      state[action.payload.index].index--;
      state[action.payload.index - 1].index++;
      return [...state.sort((a, b) => a.index - b.index)];
    case "SEND_ALBUM_DOWN":
      return state;
    default:
      return state;
  }
};

export default savedAlbumsReducer;
