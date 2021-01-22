export default interface RootState {
    movieReducer: () => {}
    savedAlbumsReducer: () => {}
    tokenReducer: () => {}
    albumReducer: () => {}
    savedMoviesReducer: () => {}
    bookReducer: () => {}
    savedBooksReducer: () => {}
    searchReducer: () => {}
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