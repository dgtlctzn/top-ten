const songReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_SONG":
            state.push(action.payload);
            return state;
        case "DEL_SONG":
            state = state.filter(song => song !== action.payload);
            return state;
        default:
            return state;
    }
}

export default songReducer;