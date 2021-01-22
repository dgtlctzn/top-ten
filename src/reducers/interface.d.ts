import { SavedItems, SearchItems } from "../containers/Interfaces/Interfaces";

export default interface RootState {
    movieReducer: () => {}
    savedAlbumsReducer: () => {}
    tokenReducer: () => {}
    albumReducer: () => {}
    savedMoviesReducer: () => {}
    bookReducer: Array<SearchItems>;
    savedBooksReducer: Array<SavedItems>;
    searchReducer: string;
    alertReducer: {
        message: string;
        status: boolean;
        color: string;
      }
    searchStatusReducer: {
        state: boolean;
    }
    router: () => {}
}