const mongoose = require('mongoose')

const RunnerSchema = new mongoose.Schema({
  student: {
    type: Boolean,
    required: true
  },
  regNumber: {
    type: String,
    required: true,
    unique: true
  },
  tshirtType: {
    type: String,
    enum: ['polo', 'round'],
    required: true,
  },
  tshirtSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: {
      validator: v => /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/.test(v)
    }
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    default: null,
    validate: {
      validator: phoneNumber => /^(?:(?:(?:\+254|0)[17])(?:\d{9}))$|^(?:(?:\+254|0)[17])(?:\d{8})$/.test(phoneNumber)
    },
    message: props => `${props.value} is not a valid number!`
    
  }

})

const Runner = mongoose.model('Runner', RunnerSchema)
module.exports = Runner
