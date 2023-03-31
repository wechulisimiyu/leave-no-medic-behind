const express = require('express')
const router = express.Router()
const { initiateSTKPush, generateTransactionStatus } = require('../controllers/paymentControllers')

const { accessToken } = require('../middleware/generateAccessToken')

router.route("/stkPush").post(accessToken, initiateSTKPush, generateTransactionStatus );

module.exports = router