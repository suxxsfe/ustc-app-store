const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    _id:Number,
    name:String,
});

module.exports = mongoose.model("Tag", TagSchema);
