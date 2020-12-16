const savedAlbumsReducer = (state = [], action) => {
    switch(action.type) {
        case "SAVE_ALBUMS":
            return [...state, action.payload];
        case "DEL_ALBUMS":
            state = state.filter(album => album !== action.payload);
            return state;
        default:
            return state;
    }
}

export default savedAlbumsReducer;