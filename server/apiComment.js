

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
  //  console.log(req.body);
    let e=req.body.Authorization;
    const {id} = jwt.verify(e.split(' ')[1], SECRET);
    User.findOne({_id:id}).then((per)=>{
    const newcomm = new Comment({
        author:{
            name:per.name,
            _id:id,
        },
        score:req.body.score,
        content:req.body.content,
        parent: req.body.parent,
    });
    newcomm.save()
           .then((res) => res.send(newcomm))
           .catch((error) => {
             console.log(error);
             res.status(500).send(error);
           });
    });
});

module.exports = router;
