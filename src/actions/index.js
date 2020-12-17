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