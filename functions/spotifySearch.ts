import axios from "axios";

exports.handler = async function (event: any, context: any) {
  try {
    const { search, token } = JSON.parse(event.body);

    const { data } = await axios({
      method: "GET",
      url: `https://api.spotify.com/v1/search?q=${search}&type=album`,
      headers: { Authorization: `Bearer ${token}` },
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
