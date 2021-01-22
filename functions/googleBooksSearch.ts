import axios from "axios";

exports.handler = async function (event: any, context: any) {
  try {
    const { search } = event.queryStringParameters;
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
