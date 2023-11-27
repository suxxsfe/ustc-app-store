const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: String,
  _id:Number,
  intro: String,
  type:String,
  regdate:String,
  visdate:String,
  projects:Array,
  links:{
    name:String,
    url:String,
  }
});

// compile model from schema
module.exports = mongoose.model("User", UserSchema);
