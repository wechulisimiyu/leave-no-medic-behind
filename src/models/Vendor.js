const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  regNumber: {
    type: String
  },
  yearOfStudy: {
    type: String,
    enum: ["I", "II", "III", "IV", "IVs", "V", "VI"]
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
