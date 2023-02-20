const express = require('express')
const router = express.Router()
const { initiateSTKPush, stkPushCallback, confirmPayment } = require('../controllers/mpesa')

const { accessToken } = require('../middleware/generateAccessToken')

// router.route('/stkPush').post(accessToken, )
router.route("/stkPush").post(accessToken, async (req, res) => {
    const amount = req.query.amount;
    const phone = req.query.phone;
  
    try {
      const response = await initiateSTKPush(amount, phone); // Call the function to initiate STK push
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error initiating STK push" });
    }
  });
router.route('/stkPushCallback/:Order_ID').post(stkPushCallback)
router.route('/confirmPayment/:CheckoutRequestID').post(accessToken, confirmPayment)

module.exports = router