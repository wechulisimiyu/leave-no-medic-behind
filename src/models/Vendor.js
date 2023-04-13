const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  beneficiary: {
    type: String,
    enum: ["yes", "no"],
    required: true
  },
  regNumber: {
    type: String,
    required: true
  },
  yearOfStudy: {
    type: String,
    enum: ["I", "II", "III", "IV", "IVs", "V", "VI"]
  },
  nameOfBusiness: {
    type: String,
    required: true
  },
  typeOfBusiness: {
    type: String,
    required: true
  },
  whatItSells: {
    type: String,
    required: true
  },
  helperName: {
    type: String,
    required: true
  },
  schoolIdPic: [{
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }]
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
