const axios = require("axios");
const router = require("express").Router();

// GET route for checkout
router.get("/checkout", (req, res) => {
  const amount = req.query.amount;
  const phone = req.query.phone;
  res.render("checkout", { amount, phone });
});

router.post("/checkout", async (req, res) => {
  const amount = req.body.amount;
  const phone = req.body.phone;

  // Make a POST request to the /initiateSTKPush route with the amount and phone number
  try {
    const response = await axios.post("/initiateSTKPush", {
      amount: amount,
      phone: phone,
    });

    // Redirect the user to the success page with the reference number
    res.redirect(`/success?referenceNumber=${response.data.referenceNumber}`);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/initiateSTKPush", async (req, res) => {
  const { amount, phone } = req.query;
  try {
    const userId = Math.floor(Math.random() * 1000000);

    const formattedPhoneNumber = formatPhoneNumber(phone);

    // Get authorization
    const tokenResponse = await axios.post(
      "https://api-omnichannel-uat.azure-api.net/v2.1/oauth/token",
      {
        grant_type: "client_credentials",
        client_secret: process.env.CLIENT_SECRET,
        client_id: process.env.CLIENT_ID,
      }
    );
    const authToken = tokenResponse.data.access_token;

    // Initiate STK push
    const response = await axios.post(
      "https://api-omnichannel-uat.azure-api.net/v1/stkussdpush/stk/initiate",
      {
        phoneNumber: formattedPhoneNumber,
        reference: `REF${userId}`,
        amount: amount,
        telco: 'SAF',
        countryCode: 'KE',
        callBackUrl: `https://www.lnmb-run.org/payment/success`,
        errorCallBackUrl: `https://www.lnmb-run.org/payment/checkout?amount=${amount}&phone=${phone}`,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    res.json({
      referenceNumber: `REF${userId}`,
      statusMessage: response.statusmessage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route for success
router.get("/success", (req, res) => {
  res.render("success");
});

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

module.exports = router;
