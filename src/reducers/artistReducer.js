const artistReducer = (state = [], action) => {
    switch(action.type) {
        case "SEARCH_ARTISTS":
            state.push(action.payload);
            return state;
        default: 
            return state;
    }
}

export default artistReducer;