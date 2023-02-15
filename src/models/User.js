const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const AdminSchema = new Schema({
 email: {
  type: String,
  required: true,
  trim: true
 },
 password: {
  type: String,
  required: true
 },
 role: {
  type: String,
  default: 'basic',
  enum: ["sales", "finance", "director", "logistics", "admin"]
 },
 accessToken: {
  type: String
 }
});
 
const Admin = mongoose.model('Admin', AdminSchema);
 
module.exports = Admin;