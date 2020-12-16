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

export const addSong = (song) => {
    return {
        type: "ADD_SONG",
        payload: song
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