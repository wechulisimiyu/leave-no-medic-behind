const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  statusCode: {
    type: String,
    required: true
  },
  additionalParameters: {
    StatusDescription: String,
    Telco: String,
    OperationType: String
  }
});

const Response = mongoose.model('Response', ResponseSchema);

module.exports = Response;