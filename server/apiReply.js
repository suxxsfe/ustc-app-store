

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
    const {id} = jwt.verify(String(req.body.authorization.split(' ').pop()), SECRET);
    const person=User.findOne({_id:id});
        
    const newreply = new Reply({
        author:{
            name:person.name,
            _id:id,
        },
        parent:req.body.parent,
        content:req.body.content,
    });
    newreply.save();
    res.send(newcomm);
});

module.exports = router;
