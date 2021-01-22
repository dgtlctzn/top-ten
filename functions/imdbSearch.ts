import axios from "axios";

exports.handler = async function (event: any, context: any) {
  try {
    const { search } = event.queryStringParameters;
    const { data } = await axios({
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
