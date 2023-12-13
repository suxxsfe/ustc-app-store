const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    author:{
        name: String,
        _id: String,
    },
    score:Number,
    content:String,
    parent: String,
});

module.exports = mongoose.model("Comment", CommentSchema);
