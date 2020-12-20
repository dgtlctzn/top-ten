const alertReducer = (state = false, action) => {
    switch(action.type) {
        case "SUCCESS":
            state = action.payload;
            return state;
        default:
            return false;
    }
}

export default alertReducer;