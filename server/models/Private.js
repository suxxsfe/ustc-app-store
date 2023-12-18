const mongoose = require("mongoose");

const PrivateSchema = new mongoose.Schema({
    name:String,
});

module.exports = mongoose.model("Private", PrivateSchema);
