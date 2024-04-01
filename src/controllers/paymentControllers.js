const axios = require("axios");
const { saveTransaction } = require("../models/Transaction");
const ngrok = require("ngrok");

const secret = process.env.SAFARICOM_CONSUMER_SECRET;
const key = process.env.SAFARICOM_CONSUMER_KEY;

const createToken = async (req, res, next) => {
  const auth = new Buffer.from(`${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`).toString('base64');
  console.log(auth);
  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((data) => {
      req.token = data.data.access_token;
      // console.log(data.data.response);
      console.log(req.token);
      console.log('just after token');
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("TOKEN GENERATION ERROR: " + err.message);
    });
};

// const authToken = async () => {

//   const auth = new Buffer.from(`${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`).toString('base64');
//   const tokenResponse = await axios.post(
//     "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
//     // {
//     //   client_id: process.env.ClientId,
//     //   client_secret: process.env.ClientSecret,
//     // },
//     {
//       headers: {
//         authorization: `Basic ${auth}`,
//       },
//     }
//   );

//   console.log(authToken)
//   // const authToken = tokenResponse.data.access_token;

//   return authToken;
// };

//stk push
const postStk = async (req, res) => {
  const { phone, amount } = req.body;
  const { access_token } = await createToken();

  const shortCode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );

  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount || 1,
    PartyA: phone || "254700568383",
    PartyB: shortCode,
    PhoneNumber: phone,
    CallBackURL: "https://lnmb-run.org/payment/callback",
    AccountReference: "purchase",
    TransactionDesc: "purchase",
  };
  await axios
    .post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", data, {
      headers: {
        authorization: `Bearer ${req.token}`,
      },
    })
    .then((data) => {
      const dataArray = [];
      dataArray.push(data.data);
      if (data.data.ResponseCode == 0) {
        const transaction = {
          MerchantRequestID: data.data.MerchantRequestID,
          CheckoutRequestID: data.data.CheckoutRequestID,
          ResultCode: data.data.ResponseCode,
          ResultDesc: data.data.ResponseDescription,
        };
      } else {
        res.status(400);
      }
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json("STK PUSH ERROR: " + err.message);
    });
};

// callback
const callback = async (req, res) => {
  const data = req.body.Body.stkCallback;
  const transaction = {
    MerchantRequestID: data.MerchantRequestID,
    CheckoutRequestID: data.CheckoutRequestID,
    ResultCode: data.ResultCode,
    ResultDesc: data.ResultDesc,
    Amount: data.CallbackMetadata?.Item[0].Value,
    MpesaReceiptNumber: data.CallbackMetadata?.Item[1].Value,
    Balance: data.CallbackMetadata?.Item[2].Value,
    TransactionDate: data.CallbackMetadata?.Item[3].Value,
    PhoneNumber: data.CallbackMetadata?.Item[4].Value,
  };
  await saveTransaction(transaction)
    .then((data) => {
      console.log("SAVED TRANSACTION", data);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("CALLBACK ERROR: " + err.message);
    });
};

module.exports = { createToken, postStk, callback };
