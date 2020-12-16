const albumReducer = (state = [], action) => {
    switch(action.type) {
        case "SEARCH_ALBUMS":
            state = [];
            for (const i of action.payload) {
                state.push(i);
            }
            return state;
        default: 
            return state;
    }
}

export default albumReducer;