const axios = require("axios");
const dotenv = require("dotenv");
const ngrok = require("ngrok");
const Response = require("../models/Response");
const moment = require("moment");

// @desc initiate stk push
// @method POST
// @route /stkPush
// @access

const initiateSTKPush = async (req, res) => {
  try {
    const { amount, phone } = req.body;
    const url =
      "https://api-omnichannel-uat.azure-api.net/v1/stkussdpush/stk/initiate";
    const auth = `Bearer ${req.access_token}`;

    const timestamp = moment().format("YYYYMMDDHHmmss");

    // create callback url
    // const callback_url = await ngrok.connect(process.env.PORT);
    // const api = ngrok.getApi();
    // await api.listTunnels();

    const reference = generateReference();
    const formattedPhoneNumber = formatPhoneNumber(phone);

    // console.log("callback ", callback_url);
    axios({
      method: "post",
      url: url,
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      data: {
        phoneNumber: formattedPhoneNumber,
        reference: reference,
        amount: amount,
        telco: "SAF",
        countryCode: "KE",
        callBackUrl: `https://www.lnmb-run.org/payment/success`,
        errorCallBackUrl: `https://www.lnmb-run.org/payment/checkout?amount=${amount}&phone=${phone}`,
      },
    })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.error(error.message);
        res.status(503).send({
          message: "Error with the stk push",
          error: error,
        });
      });
  } catch (e) {
    console.error(e);
    res.status(503).send({
      message:
        "Something went wrong while trying to create payment details. Contact admin",
      error: e,
    });
  }
};

// @desc get transaction status from the API
// @method GET
// @route /stkPush
// @access

const generateTransactionStatus = (response) => {
  const statusCode = response.StatusCode;
  const status = response.Status;
  const reference = response.Reference;

  if (statusCode === "88") {
    switch (status) {
      case "DuplicateTransaction":
        console.log(`Transaction ${reference} failed. Error: ${status}`);
        break;
      case "AmountTooLow":
        console.log(`Transaction ${reference} failed. Error: ${status}`);
        break;
      case "MaximumAmountExceeded":
        console.log(`Transaction ${reference} failed. Error: ${status}`);
        break;
      default:
        console.log(`Transaction ${reference} failed. Error: Unknown`);
        break;
    }
  } else if (statusCode === "2" || statusCode === "3" || statusCode === "4" || statusCode === "5") {
    const statusDescription = response.AdditionalParameters.StatusDescription;
    const telcoReference = response.AdditionalParameters.TelcoReference;

    switch (status) {
      case "AwaitingSettlement":
        console.log(`Transaction ${reference} is awaiting settlement.`);
        break;
      case "Completed":
        console.log(`Transaction ${reference} has completed successfully.`);
        if (statusCode === "3") {
          // Save successful transaction to database
          const transaction = {
            reference,
            status: statusCode,
            statusDescription,
            telcoReference,
            date: new Date(),
          };
          Response.create(transaction);
          console.log(`Transaction ${reference} has been saved to database.`);
        }
        break;
      case "Cancelled":
        console.log(`Transaction ${reference} has been cancelled by user. Error: ${statusDescription}`);
        break;
      case "Failed":
        console.log(`Transaction ${reference} has failed. Error: ${statusDescription}`);
        break;
      default:
        console.log(`Transaction ${reference} failed. Error: Unknown`);
        break;
    }
  }
};

const generateReference = () => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `REF${timestamp}${randomString}`;
};

const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters from the phone number
  const digitsOnly = phone.replace(/\D/g, "");

  // Check if the phone number starts with "254"
  if (digitsOnly.startsWith("254")) {
    return digitsOnly;
  } else if (digitsOnly.length === 9 && digitsOnly.startsWith("7")) {
    // If the phone number starts with "7" and is 9 digits long, assume it's a Kenyan number and add "254" at the beginning
    return `254${digitsOnly}`;
  } else {
    // Otherwise, return null to indicate that the phone number is invalid
    return null;
  }
};

module.exports = { initiateSTKPush, generateTransactionStatus };
