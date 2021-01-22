import { SearchAction } from "../actions/actions";
import { SearchItems } from "../containers/Interfaces/Interfaces";

const albumReducer = (
  state: Array<SearchItems> = [],
  action: SearchAction
): Array<SearchItems> => {
  switch (action.type) {
    case "SEARCH_ALBUMS":
      state = [];
      for (const i of action.payload) {
        state.push(i);
      }
      return state;
    default:
      return state;
  }
};

export default albumReducer;
