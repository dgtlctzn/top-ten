import { Action, ModAction, Alert, SearchStatus, FoundAction } from "./actions";
import { FoundItems } from "../containers/Interfaces/Interfaces";
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

export const saveAlbums = (album: string): Action => {
  return {
    type: "SAVE_ALBUMS",
    payload: album,
  };
};

export const delAlbum = (album: string): Action => {
  return {
    type: "DEL_ALBUM",
    payload: album,
  };
};

export const sendAlbumUp = (album: string, index: number): ModAction => {
  return {
    type: "SEND_ALBUM_UP",
    payload: { album, index },
  };
};

export const sendAlbumDown = (album: string, index: number): ModAction => {
  return {
    type: "SEND_ALBUM_DOWN",
    payload: { album, index },
  };
};

export const searchAlbums = (albums: Array<FoundItems>): FoundAction => {
  return {
    type: "SEARCH_ALBUMS",
    payload: albums,
  };
};

//=======
// Movies
//=======

export const searchMovies = (movies: Array<FoundItems>): FoundAction => {
  return {
    type: "SEARCH_MOVIES",
    payload: movies,
  };
};

export const saveMovies = (movie: string): Action => {
  return {
    type: "SAVE_MOVIES",
    payload: movie,
  };
};

export const delMovie = (movie: string): Action => {
  return {
    type: "DEL_MOVIE",
    payload: movie,
  };
};

export const sendMovieUp = (movie: string, index: number): ModAction => {
  return {
    type: "SEND_MOVIE_UP",
    payload: { movie, index },
  };
};

export const sendMovieDown = (movie: string, index: number): ModAction => {
  return {
    type: "SEND_MOVIE_DOWN",
    payload: { movie, index },
  };
};

//======
// Books
//======

export const searchBooks = (books: Array<FoundItems>): FoundAction => {
  return {
    type: "SEARCH_BOOKS",
    payload: books,
  };
};

export const saveBooks = (book: string): Action => {
  return {
    type: "SAVE_BOOKS",
    payload: book,
  };
};

export const delBook = (book: string): Action => {
  return {
    type: "DEL_BOOK",
    payload: book,
  };
};

export const sendBookUp = (book: string, index: number): ModAction => {
  return {
    type: "SEND_BOOK_UP",
    payload: { book, index },
  };
};

export const sendBookDown = (book: string, index: number): ModAction => {
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
