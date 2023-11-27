const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
    _id:Number,
    parent:Number,
    author:{
        name: String,
        _id: Number,
    },
    content:String,
});

module.exports = mongoose.model("Reply", ReplySchema);