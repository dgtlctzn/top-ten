import { SavedItems, SearchItems } from "../containers/Interfaces/Interfaces";

export default interface RootState {
    movieReducer: Array<SearchItems>;
    savedAlbumsReducer: Array<SavedItems>;
    tokenReducer: string
    albumReducer: Array<SearchItems>;
    savedMoviesReducer: Array<SavedItems>;
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