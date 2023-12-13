

const express = require("express");
const User = require("./models/User.js");
const Reply = require("./models/reply.js");
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = 'somesecret';

router.get("/replies", (req, res) => {
    Reply.find({parent: req.query._id}).then((tmp)=>res.send(tmp));
});

router.post("/reply", (req, res) => {
    let e=req.body.Authorization;
    const {id} = jwt.verify(e.split(' ')[1], SECRET);
        
    User.findOne({_id:id}).then((per)=>{
        const newreply = new Reply({
            author:{
                name:per.name,
                _id:id,
            },
            content:req.body.content,
            parent: req.body.parent,
        });
    newreply.save();
    res.send(newcomm);});
});

module.exports = router;
