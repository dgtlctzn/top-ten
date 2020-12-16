export const addMovie = (movie) => {
    return {
        type: "ADD_MOVIE",
        payload: movie
    }
}

export const delMovie = (movie) => {
    return {
        type: "DEL_MOVIE",
        payload: movie
    }
}

export const saveAlbums = (album) => {
    return {
        type: "SAVE_ALBUMS",
        payload: album
    }
}

export const delSong = (song) => {
    return {
        type: "DEL_SONG",
        payload: song
    }
}

export const addToken = (token) => {
    return {
        type: "ADD_TOKEN",
        payload: token
    }
}

export const searchAlbums = (albums) => {
    return {
        type: "SEARCH_ALBUMS",
        payload: albums
    }
}