

const express = require("express");
const User = require("./models/User.js");
const Reply = require("./models/reply.js");
const router = express.Router();
const checker = require('./jwtThings.js');

router.get("/replies", (req, res) => {
    Reply.find({parent: req.query._id}).then((tmp)=>res.send(tmp));
});

router.post("/reply", (req, res) => {
    const id=checker.getID(req.body.Authorization);
    User.findOne({_id:id}).then((per)=>{
        const newreply = new Reply({
            author:{
                name:per.name,
                _id:id,
            },
            content:req.body.content,
            parent: req.body.parent,
        });
       newreply.save()
               .then((reply) => res.send(reply))
               .catch((error) => {
                 console.log(error);
                 res.status(500).send(error);
               });
    });
});

module.exports = router;
