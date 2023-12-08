const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  intro: String,
  type:String,
  regdate:String,
  visdate:String,
  projects:Array,
  links:Array,
});

// compile model from schema
module.exports = mongoose.model("User", UserSchema);
