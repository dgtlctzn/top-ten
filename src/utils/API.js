import axios from "axios";
import qs from "qs";

const data = {
  grant_type: "client_credentials",
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
};

const API = {
  getToken: function () {
    return axios({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
    });
  },
  searchSpotify: function (search, token) {
    return axios({
      method: "GET",
      url: `https://api.spotify.com/v1/search?q=${search}&type=album`,
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  searchImdb: function (search) {
    console.log(process.env.REACT_APP_IMDB_KEY)
    return axios({
      method: "GET",
      url: `https://imdb8.p.rapidapi.com/title/find?q=${search}`,
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_IMDB_KEY,
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      },
    });
  }
};

export default API;
