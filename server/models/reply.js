const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
    parent: String,
    author:{
        name: String,
        _id: Number,
    },
    content:String,
});

module.exports = mongoose.model("Reply", ReplySchema);
