const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const { search } = event.queryStringParameters;
    if (!search) {
        return {
            statusCode: 400,
            body: null
        }
    }
    const { data } = await axios({
      method: "GET",
      url: `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.REACT_APP_GOOGLE_KEY}`,
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
