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
    default: "uon" // default value is "uon"
  },
  yearOfStudy: {
    type: String,
    enum: ["I", "II", "III", "IV", "IVs", "V", "VI"],
    required: true,
    default: "I" // default value is "I"
  },
  regNumber: {
    type: String,
    default: "H31/12345/2010" // default value is "0000-00000"
  },  
  attending: {
    type: String,
    enum: ["attending", "notattending"],
    required: true,
  },
  tshirtType: {
    type: String,
    enum: ["polo", "round"],
    required: true,
  },
  tshirtSize: {
    type: String,
    enum: ["small", "medium", "large", "extra-large"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
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
  nameOfKin: {
    type: String,
    required: true,
  },
  kinNumber: {
    type: String,
    required: true,
  },
  medicalCondition: {
    type: String,
    required: true,
  },
  pickUp: {
    type: String,
    enum: ["kenyatta-national-hospital", "chiromo-campus"]
  },
  confirm: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false
  }
});

OrderSchema.pre("save", function (next) {
  // Check if student status is 'no'
  if (this.student === "no") {
    // If student status is 'no', remove the required attribute from fields
    this.university.required = false;
    this.yearOfStudy.required = false;
    this.regNumber.required = false;
  }
  next();
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
