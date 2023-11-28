

const express = require("express");

const Reply = require("./models/reply.js");
const router = express.Router();


router.get("/replies", (req, res) => {
    Reply.find({parent: req.query._id}),then((rep)=>res.send({replies:rep}));
});
router.post("/replies", (req, res) => {
    const newcomm = new Comment({
        _id:Comment.length(),
        author:{
            name: req.query.author.name,
            _id: req.query.author._id,
        },
        parent:req.query.parent,
        content:req.query.content,
    });
    newcomm.save().then((comm) => res.send(comm));
});

module.exports = router;
