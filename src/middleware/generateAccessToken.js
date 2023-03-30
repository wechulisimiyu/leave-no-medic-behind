const axios = require("axios");
const dotenv = require("dotenv");
const querystring = require('node:querystring');

// loading the envariables
dotenv.config()

const accessToken = (req, res, next) => {
  try {
    const url = "https://api-omnichannel-uat.azure-api.net/v2.1/oauth/token";
    const data = querystring.stringify({
      client_secret: process.env.CLIENT_SECRET,
      client_id: process.env.CLIENT_ID,
      grant_type: "client_credentials",
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        req.access_token = response.data.access_token;
        console.log(req.access_token)
        next();
      })
      .catch((error) => {
        console.error("Access token error ", error);
        res.status(401).send({
          message: "Something went wrong when trying to retrieve the access token",
          error: error.message,
        });
      });
  } catch (error) {
    console.error("Access token error ", error);
    res.status(401).send({
      message: "Something went wrong when trying to retrieve the access token",
      error: error.message,
    });
  }
};

module.exports = { accessToken };