

const express = require("express");

const Reply = require("./models/reply.js");
const router = express.Router();


router.get("/replies", (req, res) => {
    Reply.find({parent: req.query._id}).then((tmp)=>res.send(tmp));
});
router.post("/replies", (req, res) => {
    const newcomm = new Comment({
        author:{
            name: "ixed",
            _id: 123,
        },
        parent:req.query.parent,
        content:req.query.content,
    });
    newcomm.save();
    res.send(newcomm);
});

module.exports = router;
