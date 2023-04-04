const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  confirmationMessage: {
    type: String,
    required: true
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;