//======
// Token
//======

export const addToken = (token) => {
  return {
    type: "ADD_TOKEN",
    payload: token,
  };
};

//=======
// Search
//=======

export const setSearch = (search) => {
  return {
    type: "SET_SEARCH",
    payload: search,
  };
};

//=======
// Albums
//=======

export const saveAlbums = (album) => {
  return {
    type: "SAVE_ALBUMS",
    payload: album,
  };
};

export const delAlbum = (album) => {
  return {
    type: "DEL_ALBUM",
    payload: album,
  };
};

export const sendAlbumUp = (album, index) => {
  return {
    type: "SEND_ALBUM_UP",
    payload: { album, index },
  };
};

export const sendAlbumDown = (album, index) => {
  return {
    type: "SEND_ALBUM_DOWN",
    payload: { album, index },
  };
};

export const searchAlbums = (albums) => {
  return {
    type: "SEARCH_ALBUMS",
    payload: albums,
  };
};

//=======
// Movies
//=======

export const searchMovies = (movies) => {
  return {
    type: "SEARCH_MOVIES",
    payload: movies,
  };
};

export const saveMovies = (movie) => {
  return {
    type: "SAVE_MOVIES",
    payload: movie,
  };
};

export const delMovie = (movie) => {
  return {
    type: "DEL_MOVIE",
    payload: movie,
  };
};

export const sendMovieUp = (movie, index) => {
  return {
    type: "SEND_MOVIE_UP",
    payload: { movie, index },
  };
};

export const sendMovieDown = (movie, index) => {
  return {
    type: "SEND_MOVIE_DOWN",
    payload: { movie, index },
  };
};

//======
// Books
//======

export const searchBooks = (books) => {
  return {
    type: "SEARCH_BOOKS",
    payload: books,
  };
};

export const saveBooks = (book) => {
  return {
    type: "SAVE_BOOKS",
    payload: book,
  };
};

export const delBook = (book) => {
  return {
    type: "DEL_BOOK",
    payload: book,
  };
};

export const sendBookUp = (book, index) => {
  return {
    type: "SEND_BOOK_UP",
    payload: { book, index },
  };
};

export const sendBookDown = (book, index) => {
  return {
    type: "SEND_BOOK_DOWN",
    payload: { book, index },
  };
};

//======
// alert
//======

export const successMessage = (enabled, category="") => {
  return {
    type: "SUCCESS",
    payload: {category, enabled},
  };
};

export const deleteMessage = (enabled, category="") => {
  return {
    type: "DELETE",
    payload: {category, enabled},
  };
};

export const warningMessage = (enabled, category="") => {
  return {
    type: "WARNING",
    payload: {category, enabled},
  };
};

//=======
// search
//=======

export const searchStatus = (enabled) => {
  return {
    type: "SEARCHING",
    payload: enabled,
  };
};
