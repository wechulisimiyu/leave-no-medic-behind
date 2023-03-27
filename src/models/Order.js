const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  student: {
    type: String,
    enum: ["yes", "no"],
    required: true,
  },
  university: {
    type: String,
    enum: ["uon", "partner", "other"],
    required: true,
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
    enum: ["polo", "round"],
    required: true,
  },
  tshirtSize: {
    type: String,
    enum: ["small", "medium", "large"],
    required: true,
  },
  quantity: {
    type: Number,
    max: 3,
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
    required: [true, "email is required"],
    unique: true,
    validate: {
      validator: (v) => /^([\w-.]+@([\w-]+.)+[\w-]{2,4}(\.\w+)*)?$/.test(v),
    },
    message: (props) => `${props.value} is not a valid email!`,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    default: null,
    validate: {
      validator: (phoneNumber) =>
        /^(?:(?:(?:\+254|0)[17])(?:\d{9}))$|^(?:(?:\+254|0)[17])(?:\d{8})$/.test(
          phoneNumber
        ),
    },
    message: (props) => `${props.value} is not a valid number!`,
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
    enum: ["none", "kenyatta-national-hospital", "chiromo-campus"]
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
