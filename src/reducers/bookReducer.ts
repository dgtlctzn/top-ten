import { SearchAction } from "../actions/actions";
import { SearchItems } from "../containers/Interfaces/Interfaces";

const bookReducer = (
  state: Array<SearchItems> = [],
  action: SearchAction
): Array<SearchItems> => {
  switch (action.type) {
    case "SEARCH_BOOKS":
      state = [];
      for (const i of action.payload) {
        state.push(i);
      }
      return state;
    default:
      return state;
  }
};

export default bookReducer;
