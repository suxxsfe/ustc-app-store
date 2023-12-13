

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
    const {id} = jwt.verify(String(req.body.Authorization.split(' ').pop()), SECRET);
    User.findOne({_id:id})
        .then((person) => new Reply({
            author:{
                name:person.name,
                _id:person._id,
             },
            parent:req.body.parent,
            content:req.body.content,      
        }).save()
          .then((reply) => res.send(reply))
          .catch((error) => {
            console.log(error);
            res.status(500).send(error);
          })
        );
});

module.exports = router;
