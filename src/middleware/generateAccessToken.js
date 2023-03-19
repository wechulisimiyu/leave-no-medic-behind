const axios = require("axios");
const dotenv = require("dotenv");

// loading the config files
dotenv.config({ path: "./config/config.env" });

const accessToken = (req, res, next) => {
  try {
    const url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth = new Buffer.from(
      `${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`
    ).toString("base64");

    axios(
      {
        url: url,
        headers: {
          Authorization: "Basic " + auth,
        },
      },
      (error, response, body) => {
        if (error) {
          res.status(401).send({
            message: "Something went wrong when trying to process your payment",
            error: error.message,
          });
        } else {
          req.safaricom_access_token = JSON.parse(body).access_token;
          next();
        }
      }
    );
  } catch (error) {
    console.error("Access token error ", error);
    res.status(401).send({
      message: "Something went wrong when trying to process your payment",
      error: error.message,
    });
  }
};

module.exports = { accessToken };