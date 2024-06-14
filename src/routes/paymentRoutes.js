const express = require('express');
const router = express.Router();

const { postStk, callback} = require('../controllers/paymentControllers');
const { validateTransaction } = require('../utils/transactionValidation');

router.post('/stkpush', postStk);
router.post('/callback', callback);
router.post('/validate', validateTransaction);

module.exports = router;