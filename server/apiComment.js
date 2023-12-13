

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
    User.findOne({_id:id})
        .then((person) => new Comment({
            author:{
                name:person.name,
                _id:person._id,
             },
            score:req.body.score,
            content:req.body.content,
            parent: req.body.parent,
        }).save()
          .then((comment) => res.send(comment))
          .catch((error) => {
            console.log(error);
            res.status(500).send(error);
          })
        );
});

module.exports = router;
