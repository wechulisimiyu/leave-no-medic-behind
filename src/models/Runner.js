const mongoose = require("mongoose")

const RunnerSchema = mongoose.Schema(
  {
    studentStatus: {
      type: Boolean,
      required: [true, 'Why no bacon?'],
      unique: true,
      default: false,
    },
    regNumber: {
      type: 'String',
      required: [true, 'Why no bacon?'],
      unique: true,
    },
    name: {
      type: 'String',
      required: [true, 'Why no bacon?'],
      unique: true,
    },
    email: {
      type: 'String',
      required: [true, 'Why no bacon?'],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Why no bacon?'],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Runner", RunnerSchema)
