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
        payload: movie
    }
}

export const delSong = (song) => {
    return {
        type: "DEL_SONG",
        payload: song
    }
}