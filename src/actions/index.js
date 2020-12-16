export const addMovie = (movie) => {
  return {
    type: "ADD_MOVIE",
    payload: movie,
  };
};

export const delMovie = (movie) => {
  return {
    type: "DEL_MOVIE",
    payload: movie,
  };
};

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

export const addToken = (token) => {
  return {
    type: "ADD_TOKEN",
    payload: token,
  };
};

export const searchAlbums = (albums) => {
  return {
    type: "SEARCH_ALBUMS",
    payload: albums,
  };
};
