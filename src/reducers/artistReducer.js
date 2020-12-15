const artistReducer = (state = [], action) => {
    switch(action.type) {
        case "SEARCH_ARTISTS":
            state = [];
            for (const i of action.payload) {
                state.push(i);
            }
            return state;
        default: 
            return state;
    }
}

export default artistReducer;