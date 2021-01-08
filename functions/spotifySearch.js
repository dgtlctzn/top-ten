const axios = require("axios");
const qs = require("qs");

exports.handler = async function (event, context) {
  console.log(event.body);
  const { search, token } = JSON.parse(event.body);
  console.log(token);
  console.log(search);
  const { data } = await axios({
    method: "GET",
    url: `https://api.spotify.com/v1/search?q=${search}&type=album`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return {
      statusCode: 200,
      body: JSON.stringify(data)
  }
};
