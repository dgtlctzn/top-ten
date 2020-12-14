const movieReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_MOVIE":
            state.push(action.payload);
            return state;
        case "DEL_MOVIE":
            state.filter(movie => movie !== action.payload);
            return state;
        default:
            return state;
    }
}

export default movieReducer;