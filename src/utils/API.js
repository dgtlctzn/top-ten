import axios from "axios";

const API = {
  getToken: function () {
    return axios({
      method: "GET",
      url: "https://top-ten.netlify.app/.netlify/functions/spotifyToken",
    });
  },
  searchSpotify: function (search, token) {
    return axios({
      method: "POST",
      url: "https://top-ten.netlify.app/.netlify/functions/spotifySearch",
      data: {
        search,
        token
      }
    });
  },
  searchImdb: function (search) {
    return axios({
      method: "GET",
      url: `https://top-ten.netlify.app/.netlify/functions/imdbSearch?search=${search}`,
    });
  },
  searchGoogleBooks: function (search) {
    return axios({
      method: "GET",
      url: `https://top-ten.netlify.app/.netlify/functions/googleBooksSearch?search=${search}`,
    });
  },
};

export default API;
