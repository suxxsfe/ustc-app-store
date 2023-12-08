const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    author:{
        name: String,
        _id: Number,
    },
    score:Number,
    content:String,
});

module.exports = mongoose.model("Comment", CommentSchema);
