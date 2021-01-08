const alertReducer = (state = {}, action) => {
    switch(action.type) {
        case "SUCCESS":
            return {
                message: `${action.payload.category} added to top ten!`,
                status: action.payload.enabled,
                color: "alert alert-success"
            }
        case "DELETE":
            return {
                message: `${action.payload.category} removed from top ten.`,
                status: action.payload.enabled,
                color: "alert alert-danger"
            }
        case "WARNING":
            return {
                message: `You already have 10 ${action.payload.category}s. Remove one to add more.`,
                status: action.payload.enabled,
                color: "alert alert-warning"
            }
        case "NO_RESULTS":
            return {
                message: `No ${action.payload.category}s found.`,
                status: action.payload.enabled,
                color: "alert alert-warning"
            }
        case "NO_SEARCH_TERM":
            return {
                message: `Nothing to search!`,
                status: action.payload.enabled,
                color: "alert alert-warning"
            }
        default:
            return state;
    }
}

export default alertReducer;