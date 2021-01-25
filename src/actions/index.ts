import { Action, ModAction, Alert, SearchStatus, SearchAction, SaveAction } from "./actions";
import { SearchItems, SavedItems } from "../containers/Interfaces/Interfaces";
//======
// Token
//======

export const addToken = (token: string): Action => {
  return {
    type: "ADD_TOKEN",
    payload: token,
  };
};

//=======
// Search
//=======

export const setSearch = (search: string): Action => {
  return {
    type: "SET_SEARCH",
    payload: search,
  };
};

//=======
// Albums
//=======

export const saveAlbums = (album: SavedItems): SaveAction => {
  return {
    type: "SAVE_ALBUMS",
    payload: album,
  };
};

export const delAlbum = (album: SavedItems): SaveAction => {
  return {
    type: "DEL_ALBUM",
    payload: album,
  };
};

export const sendAlbumUp = (album: SavedItems, index: number): ModAction => {
  return {
    type: "SEND_ALBUM_UP",
    payload: { album, index },
  };
};

export const reorderBook = (book: SavedItems, index: number, newIndex: number) => {
  return {
    type: "REORDER_BOOK",
    payload: { book, index, newIndex },
  };
};

export const sendAlbumDown = (album: SavedItems, index: number): ModAction => {
  return {
    type: "SEND_ALBUM_DOWN",
    payload: { album, index },
  };
};

export const searchAlbums = (albums: Array<SearchItems>): SearchAction => {
  return {
    type: "SEARCH_ALBUMS",
    payload: albums,
  };
};

//=======
// Movies
//=======

export const searchMovies = (movies: Array<SearchItems>): SearchAction => {
  return {
    type: "SEARCH_MOVIES",
    payload: movies,
  };
};

export const saveMovies = (movie: SavedItems): SaveAction => {
  return {
    type: "SAVE_MOVIES",
    payload: movie,
  };
};

export const delMovie = (movie: SavedItems): SaveAction => {
  return {
    type: "DEL_MOVIE",
    payload: movie,
  };
};

export const sendMovieUp = (movie: SavedItems, index: number): ModAction => {
  return {
    type: "SEND_MOVIE_UP",
    payload: { movie, index },
  };
};

export const sendMovieDown = (movie: SavedItems, index: number): ModAction => {
  return {
    type: "SEND_MOVIE_DOWN",
    payload: { movie, index },
  };
};

//======
// Books
//======

export const searchBooks = (books: Array<SearchItems>): SearchAction => {
  return {
    type: "SEARCH_BOOKS",
    payload: books,
  };
};

export const saveBooks = (book: SavedItems): SaveAction => {
  return {
    type: "SAVE_BOOKS",
    payload: book,
  };
};

export const delBook = (book: SavedItems): SaveAction => {
  return {
    type: "DEL_BOOK",
    payload: book,
  };
};

export const sendBookUp = (book: SavedItems, index: number): ModAction => {
  return {
    type: "SEND_BOOK_UP",
    payload: { book, index },
  };
};

export const sendBookDown = (book: SavedItems, index: number): ModAction => {
  return {
    type: "SEND_BOOK_DOWN",
    payload: { book, index },
  };
};

//======
// alert
//======

export const successMessage = (enabled: boolean, category = ""): Alert => {
  return {
    type: "SUCCESS",
    payload: { category, enabled },
  };
};

export const deleteMessage = (enabled: boolean, category = ""): Alert => {
  return {
    type: "DELETE",
    payload: { category, enabled },
  };
};

export const warningMessage = (enabled: boolean, category = ""): Alert => {
  return {
    type: "WARNING",
    payload: { category, enabled },
  };
};

export const noResultsMessage = (enabled: boolean, category = ""): Alert => {
  return {
    type: "NO_RESULTS",
    payload: { category, enabled },
  };
};

export const noSearchTermMessage = (enabled: boolean, category = ""): Alert => {
  return {
    type: "NO_SEARCH_TERM",
    payload: { category, enabled },
  };
};

//=======
// search
//=======

export const searchStatus = (enabled: boolean): SearchStatus => {
  return {
    type: "SEARCHING",
    payload: enabled,
  };
};
