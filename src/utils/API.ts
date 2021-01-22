import axios, { AxiosPromise } from "axios";

interface APIinterface {
  getToken: () => AxiosPromise;
  searchSpotify: (search: string, token: string) => AxiosPromise;
  searchImdb: (search: string) => AxiosPromise;
  searchGoogleBooks: (search: string) => AxiosPromise;
}

const API: APIinterface = {
  getToken: function () {
    return axios({
      method: "GET",
      url: "https://top-ten.netlify.app/.netlify/functions/spotifyToken",
    });
  },
  searchSpotify: function (search: string, token: string) {
    return axios({
      method: "POST",
      url: "https://top-ten.netlify.app/.netlify/functions/spotifySearch",
      data: {
        search,
        token
      }
    });
  },
  searchImdb: function (search: string) {
    return axios({
      method: "GET",
      url: `https://top-ten.netlify.app/.netlify/functions/imdbSearch?search=${search}`,
    });
  },
  searchGoogleBooks: function (search: string) {
    return axios({
      method: "GET",
      url: `https://top-ten.netlify.app/.netlify/functions/googleBooksSearch?search=${search}`,
    });
  },
};

export default API;
