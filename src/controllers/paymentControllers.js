const axios = require("axios");
const dotenv = require("dotenv");
const ngrok = require("ngrok");
const Mpesa = require("../models/Mpesa");

// @desc initiate stk push
// @method POST
// @route /stkPush
// @access

const initiateSTKPush = async (req, res) => {
  try {
    const { amount, phone } = req.body;
    const url =
      "https://api-omnichannel-uat.azure-api.net/v1/stkussdpush/stk/initiate";
    const auth = "Bearer" + req.access_token;

    const timestamp = moment().format("YYYYMMDDHHmmss");
    //shortcode + passkey + timestamp
    const password = new Buffer.from(
      process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp
    ).toString("base64");

    // create callback url
    const callback_url = await ngrok.connect(process.env.PORT);
    const api = ngrok.getApi();
    await api.listTunnels();

    console.log("callback ", callback_url);
    axios({
      method: "post",
      url: url,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: {
        phoneNumber: 254700568383,
        reference: "REF010920211500",
        amount: 1,
        telco: "SAF",
        countryCode: "KE",
        callBackUrl: `${callback_url}/payment/stkPushCallback/`,
        errorCallBackUrl: `${callback_url}/payment/errorstkPushCallback/`,
      },
    })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.error(error);
        res.status(503).send({
          message: "Error with the stk push",
          error: error,
        });
      });
  } catch (e) {
    console.error("Error while trying to create LipaNaMpesa details", e);
    res.status(503).send({
      message:
        "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
      error: e,
    });
  }
};
