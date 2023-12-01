

const express = require("express");

const Reply = require("./models/reply.js");
const router = express.Router();


router.get("/replies", (req, res) => {
    const tmp={replies: Reply.find({parent: req.query._id})};
    res.send(tmp);
});
router.post("/replies", (req, res) => {
    const newcomm = new Comment({
        _id:Reply.countDocuments({}),
        author:{
            name: req.query.author.name,
            _id: req.query.author._id,
        },
        parent:req.query.parent,
        content:req.query.content,
    });
    newcomm.save();
    res.send(newcomm);
});

module.exports = router;
