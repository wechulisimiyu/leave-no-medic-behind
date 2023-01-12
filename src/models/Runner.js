const mongoose = require("mongoose")

const RunnerSchema = new mongoose.Schema(
  {
    studentStatus: {
      type: Boolean,
      default: true,
      required: true,
    },
    regNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Runner", RunnerSchema)
