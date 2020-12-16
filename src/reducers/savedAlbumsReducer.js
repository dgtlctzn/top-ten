const savedAlbumsReducer = (state = [], action) => {
    switch(action.type) {
        case "SAVE_ALBUMS":
            return [...state, action.payload];
        case "DEL_ALBUM":
            state = state.filter(album => album.name !== action.payload.name);
            return state;
        default:
            return state;
    }
}

export default savedAlbumsReducer;