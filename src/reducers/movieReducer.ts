import { SearchAction } from "../actions/actions";
import { SearchItems } from "../containers/Interfaces/Interfaces";

const movieReducer = (
  state: Array<SearchItems> = [],
  action: SearchAction
): Array<SearchItems> => {
  switch (action.type) {
    case "SEARCH_MOVIES":
      state = [];
      for (const i of action.payload) {
        state.push(i);
      }
      return state;
    default:
      return state;
  }
};

export default movieReducer;
