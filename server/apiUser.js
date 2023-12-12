
const express = require("express");
const User = require("./models/User.js");
const router = express.Router();


const jwt = require('jsonwebtoken');
const SECRET = 'somesecret';

router.get("/userinfo", (req, res) => {
    User.findOne({_id:req.body._id}).then((tmp)=>{tmp.password="?????";res.send(tmp)});
});
router.get("/userprojects", (req, res) => {
    User.findOne({_id:req.body._id}).then((tmp)=>res.send(tmp.projects));
});
router.post("/userupdate", (req, res) => {
    const {id} = jwt.verify(String(req.body.authorization.split(' ').pop()), SECRET);
    User.update({_id:id},{$set:{
        name: req.body.name,
        password:req.body.password,
        intro: req.body.intro,
        type: req.body.type,
        regdate: req.body.regdate,
        visdate: req.body.visdate,
        projects: req.body.projects,
        links: req.body.links,
}},exec());
});

module.exports = router;
