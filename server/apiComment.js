

const express = require("express");
const User = require("./models/User.js");
const Comment = require("./models/Comment.js");
const router = express.Router();
const checker = require('./jwtThings.js');
router.get("/comments", (req, res) => {
    Comment.find({parent: req.query._id}).then((tmp)=>{res.send(tmp)}).catch((error) => {
      console.log("data base not found: \n"+error);
      res.status(404).send({});
    });
});


router.post("/comment", (req, res) => {
 console.log(req);
  if(!req.body.Authorization || req.body.Authorization == ""){
    res.status(403).send("please login first");
    return;
  }
    const id=checker.getID(req.body.Authorization);
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
           .then((newcomm) => res.send(newcomm))
           .catch((error) => {
             console.log(error);
             res.status(500).send(error);
           });
    });
});

module.exports = router;
