const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  // Passport-Local Mongoose auto add username and password field with hash & salt.
  // Id auto insert by mongoose.
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose); // Apply the passport-local-mongoose plugin to userSchema

module.exports = mongoose.model("User", userSchema); // Create and export the User model