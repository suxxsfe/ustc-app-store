

const express = require("express");

const User = require("./models/User.js");
const router = express.Router();



router.get("/userinfo", (req, res) => {
    User.findOne({'user._id':req.query._id}).then((tmp)=>res.send(tmp));
});
router.get("/userprojects", (req, res) => {
    User.findOne({'user._id':req.query._id}).then((tmp)=>res.send(tmp));
});
router.post("/userCreate", (req, res) => {
    const newuser = new User({
        user:{
            name:req.query.user,
            _id:User.countDocuments({}),},
        intro: req.query.intro,
        type:req.query.type,
        regdate:req.query.regdate,
        visdate:req.query.visdate,
        projects:req.query.projects,
        links:req.query.links,
    });
    newuser.save().then((user) => res.send(user));
});
// router.post("/userupdate", (req, res) => {
//     let e=req.query;
//     if(e.intro.length()>1)User.update({_id:e._id},{$set:{intro:e.intro}},exec());
//     if(e.type.length()>1)User.update({_id:e._id},{$set:{type:e.type}},exec());
//     if(e.regdate.length()>1)User.update({_id:e._id},{$set:{regdate:e.regdate}},exec());
//     if(e.visdate.length()>1)User.update({_id:e._id},{$set:{visdate:e.visdate}},exec());
//     if(e.link.webname.length()>1)User.update({_id:e._id},{$set:{link:e.link}},exec());

// });
    
module.exports = router;
