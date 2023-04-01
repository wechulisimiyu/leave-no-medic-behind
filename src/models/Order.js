const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  student: {
    type: String,
    enum: ["yes", "no"],
    required: true,
  },
  university: {
    type: String,
    enum: ["uon", "partner", "other"]
  },
  level: {
    type: String,
    enum: ["I", "II", "III", "IV", "IVs", "V", "VI"]
  },
  regNumber: {
    type: String,
  },
  buying: {
    type: String,
    enum: ["buying", "donating"]
  },
  attending: {
    type: String,
    enum: ["attending", "notattending"]
  },
  tshirtType: {
    type: String,
    enum: ["polo", "round"]
  },
  tshirtSize: {
    type: String,
    enum: ["small", "medium", "large"]
  },
  quantity: {
    type: Number
  },
  totalAmount: {
    type: Number,
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"]
  },
  phone: {
    type: String,
    required: true,
  },
  kin: {
    type: String,
  },
  kinNumber: {
    type: String,
  },
  donatedAmount: {
    type: Number,
  },
  pickUp: {
    type: String,
    enum: ["kenyatta-national-hospital", "chiromo-campus"]
  },
  buying: {
    type: String,
    enum: ["buying", "donating"],
    required: true,
  },
});

OrderSchema.pre("save", function (next) {
  if (this.buying === "donating") {
    this.set({
      name: this.name,
      email: this.email,
      phone: this.phone,
      donatedAmount: this.donatedAmount,
    });
  }
  next();
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
