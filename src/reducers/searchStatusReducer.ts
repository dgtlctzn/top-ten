import { SearchStatus } from "../actions/actions";

const searchStatusReducer = (state = false, action: SearchStatus) => {
  switch (action.type) {
    case "SEARCHING":
      return action.payload;
    default:
      return state;
  }
};

export default searchStatusReducer;
