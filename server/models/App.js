const mongoose = require("mongoose");

const AppSchema = new mongoose.Schema({
    name:String,
    authors:Array,
    createdate:String,
    updatedate:String,
    img_url:String,
    links:Array,
    downloads:Array,
    tags:Array,
    platforms:Array,
    describe:String,
});

// compile model from schema
module.exports = mongoose.model("App", AppSchema);
