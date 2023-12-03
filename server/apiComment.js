

const express = require("express");

const Comment = require("./models/Comment.js");
const router = express.Router();



router.get("/comments", (req, res) => {
    Comment.find({_id: req.query._id}).then((tmp)=>{res.send(tmp)});
});


router.post("/comment", (req, res) => {
    const newcomm = new Comment({
        _id:Comments.countDocuments({}),
        author:{
            name:"ixed",
            _id:123,
            //name:req.author.name,
            //_id:req.author._id,
            // name: document.cookie.name,
            // _id: document.cookie._id,
        },
        score:req.query.score,
        content:req.query.content,
    });
    newcomm.save();res.send(newcomm._id);
});

module.exports = router;
