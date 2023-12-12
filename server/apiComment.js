

const express = require("express");
const User = require("./models/User.js");
const Comment = require("./models/Comment.js");
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = 'somesecret';


router.get("/comments", (req, res) => {
    Comment.find({parent: req.query._id}).then((tmp)=>{res.send(tmp)});
});


router.post("/comment", (req, res) => {
 //   res.send(String(req.body.Authorization));
 
    const {id} = jwt.verify(String(req.body.Authorization.split(' ').pop()), SECRET);
    const person=User.findOne({_id:id});
    const newcomm = new Comment({
        author:{
            name:person.name,
            _id:id,
            //name:req.author.name,
            //_id:req.author._id,
            // name: document.cookie.name,
            // _id: document.cookie._id,
        },
        score:req.body.score,
        content:req.body.content,
        parent: req.body.parent,
    });
    newcomm.save();res.send(newcomm._id);
});

module.exports = router;
