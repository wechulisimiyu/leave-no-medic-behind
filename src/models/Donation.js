const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    required: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  date: { type: Date, default: Date.now },
});

const Donation = mongoose.model("Donation", DonationSchema);
module.exports = Donation;
