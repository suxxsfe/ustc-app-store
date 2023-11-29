

const express = require("express");

const Comment = require("./models/Comment.js");
const router = express.Router();



router.get("/comments", (req, res) => {
    Comment.find({_id: req.query._id}),then((comm)=>res.send({comments:comm}));
});


router.post("/comment", (req, res) => {
    const newcomm = new Comment({
        _id:Comment.length(),
        author:{
            name:"123",
            _id:123,
            // name: document.cookie.name,
            // _id: document.cookie._id,
        },
        score:req.query.score,
        content:req.query.content,
    });
    newcomm.save().then((comm) => res.send(comm));
});
router.post("/commentscore", (req, res) => {
    User.update({_id:req.query._id},{$set:{score:score+e.scorechange}},exec());
});

module.exports = router;
