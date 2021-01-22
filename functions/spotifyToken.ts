import axios from "axios";
import qs from "qs";

exports.handler = async function (event: any, context: any) {
  try {
    const options = {
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      };
      const { data } = await axios({
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(options),
      });
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
  } catch (err) {
      console.log(err);
      return {
          statusCode: 500,
          body: null
      }
  }

};
