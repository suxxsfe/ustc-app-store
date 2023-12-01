

const express = require("express");

const Comment = require("./models/Comment.js");
const router = express.Router();



router.get("/comments", (req, res) => {
    const tmp={replies:Comment.find({_id: req.query._id})};
    res.send(tmp);
});


router.post("/comment", (req, res) => {
    const newcomm = new Comment({
        _id:15,
        author:{
            name:"123",
            _id:123,
            // name: document.cookie.name,
            // _id: document.cookie._id,
        },
        score:req.query.score,
        content:req.query.content,
    });
    newcomm.save();res.send(newcomm);
});
router.post("/commentscore", (req, res) => {
    User.update({_id:req.query._id},{$set:{score:score+e.scorechange}},exec());
});

module.exports = router;
