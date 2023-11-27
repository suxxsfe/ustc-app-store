

const express = require("express");

const User = require("./models/user.js");
const App = require("./models/app.js");
const Comment = require("./models/Comment.js");
const Reply = require("./models/reply.js");
const Tag = require("./models/tags.js");
const router = express.Router();



router.get("/comments", (req, res) => {
    Comment.find({_id: req.query._id}),then((comm)=>res.send({comments:comm}));
});


router.post("/comments", (req, res) => {
    const newcomm = new Comment({
        _id:Comment.length(),
        author:{
            name: req.query.author.name,
            _id: req.query.author._id,
        },
        score:req.query.score,
        content:req.query.content,
    });
    newcomm.save().then((comm) => res.send(comm));
});
  

module.exports = router;
