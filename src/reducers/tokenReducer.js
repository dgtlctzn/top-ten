const tokenReducer = (state = "", action) => {
    switch(action.type) {
        case "ADD_TOKEN":
            state = action.payload;
            return state;
        default:
            return state;
    }
}