

const express = require("express");

const User = require("./models/user.js");
const router = express.Router();



router.get("/userinfo", (req, res) => {
    User.find({_id: req.query._id}),then((user)=>res.send(User));
});
router.get("/userprojects", (req, res) => {
    User.find({_id: req.query._id}),then((user)=>res.send(User));
});
module.exports = router;
