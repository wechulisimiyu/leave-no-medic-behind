const express = require('express')
const router = express.Router()
const { initiateSTKPush, stkPushCallback, confirmPayment } = require('../controllers/mpesaController')
const url = require('url')

const { accessToken } = require('../middleware/generateAccessToken')

router.route("/stkPush").post(accessToken, initiateSTKPush);
router.route('/stkPushCallback/:Order_ID').post(stkPushCallback)
router.route('/confirmPayment/:CheckoutRequestID').post(accessToken, confirmPayment)

// app.get('/stkPush/:amount/:phone', (res, req) => {
//   const {amount, phone} = req.params
//   const redirectionLink = url.format(
//     pathname: `/push/to/mpesa/${phone}/${amount}`
//   res.redirect(redirectionLink)
//   )
// })

// app.get('push/to/mpesa/:phone/:amount', (res, req) => {
//   const {phone, amount} = req.params
//   console.log(`Data: ${phone}, ${number}`)
// })

module.exports = router