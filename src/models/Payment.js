const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  state: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  confirmationMessage: {
    type: String,
    required: true,
    unique: true
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;