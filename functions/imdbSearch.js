const axios = require("axios");

exports.handler = async function (event, context) {
  try {
      console.log(event.queryStringParameters);
    const {search} = event.queryStringParameters;
    const { data } = axios({
      method: "GET",
      url: `https://imdb-api.com/en/API/SearchMovie/${process.env.REACT_APP_IMBD_SECRET}/${search}`,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: null,
    };
  }
};
