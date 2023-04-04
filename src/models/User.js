const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    default: "sales",
    enum: ["sales", "director", "logistics", "admin"],
  },
  date: { type: Date, default: Date.now },
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
