const mongoose = require("mongoose");

const AppSchema = new mongoose.Schema({
    _id:Number,
    name:String,
    authors:Array,
    createdate:String,
    updatedate:String,
    img_url:String,
    links:Array,
      // {
  //   webname:String,
  //   url:String,
  // }
    downloads:Array,
    //看api.md
    tags:Array,
    platforms:Array,
    describe:String,
});

// compile model from schema
module.exports = mongoose.model("App", AppSchema);
