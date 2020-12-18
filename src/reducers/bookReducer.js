const bookReducer = (state = [], action) => {
    switch(action.type) {
        case "SEARCH_BOOKS":
            state = [];
            for (const i of action.payload) {
                state.push(i);
            }
            return state;
        default: 
            return state;
    }
}

export default bookReducer;