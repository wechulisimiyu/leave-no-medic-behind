const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  regNumber: {
    type: String,
    unique: true,
    validate: {
      validator: (regNum) => /^[hviHVI]\d{2}\/\d{4,6}\/\d{4}$/.test(regNum),
    },
    message: (props) => `${props.value} is not a valid registration number!`,
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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["raceadmin", "salesadmin", "financeadmin"],
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
