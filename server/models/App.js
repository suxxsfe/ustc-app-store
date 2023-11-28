const mongoose = require("mongoose");

const AppSchema = new mongoose.Schema({
    _id:Number,
    name:String,
    authors:Array,
    createdate:String,
    updatedate:String,
    links:{
        name:String,
        url:String,
    },
    tags:Array,
    platforms:Array,
    describe:String,
});

// compile model from schema
module.exports = mongoose.model("App", AppSchema);
