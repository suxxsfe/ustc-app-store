const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    _id:Number,
    author:{
        name: String,
        id: Number,
    },
    score:Number,
    content:String,
});

module.exports = mongoose.model("Comment", CommentSchema);
