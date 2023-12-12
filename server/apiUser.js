
const express = require("express");
const User = require("./models/User.js");
const router = express.Router();


const jwt = require('jsonwebtoken');
const SECRET = 'somesecret';

router.get("/userinfo", (req, res) => {
//const op="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Njk5Nzg0ZGFhMGUzZjRmM2NiMTY3OSIsImlhdCI6MTcwMjAyNzI3NH0.BZKSpegNfSXl8SKLGJf4ZE6HCReKJ-2RrlObIk0HKZ4";
    const {id} = jwt.verify(req.body.token, SECRET);
    User.findOne({_id:id}).then((tmp)=>res.send(tmp));
});
router.get("/userprojects", (req, res) => {
    const {id} = jwt.verify(req.body.token, SECRET);
    User.findOne({_id:id}).then((tmp)=>res.send(tmp.projects));
});

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    return cb(null, path.join(__dirname, "upload", "userlogo"));
  },
  filename: function(req, file, cb){
    return cb(null, file.fieldname+'-'+Date.now()+"."+file.mimetype.split('/')[1]);
  },
})
const upload = multer({ storage: storage, limits: {fileSize: 1024*1024*10} });

const fs = require("fs");
router.post("/userinfo/logo", upload.single("file"), (req, res) => {
  let { size, mimetype, path } = req.file;
  const allowType = ["jpeg", "jpg", "png"];
  const yourType = mimetype.split('/')[1];
  
  if(size > 1024*1024*10){
    return res.status(500).send("size too large");
  }
  else if(allowType.indexOf(yourType) === -1){
    return res.status(500).send("wrong photo format");
  }
  else{
    //TODO: check Authorization
    if(/*Authorization checked*/true){
      User.findOne({_id: req.body._id})
      .then((user) => {
//      fs.unlink(user.logo);
        User.findOneAndUpdate({_id: req.body._id}, {
          logo: "upload/userlogo/"+req.file.filename,
        }, {new: true})
        .then((logo) => {
          res.send(logo);
        })
        .catch((error) => {
          console.log(error);
        });
      })
    }
    else{
//      fs.unlink(path.join(__dirname, "upload", "userlogo", req.file.filename));
    }
  }
});
// router.post("/userinfo",(req,res)=>{
//     const newuser = new User({
//         name:"未命名",
//         password:req.body.password,
//         intro: req.query.intro,
//         links:req.query.links,
//     });
//     newuserser.save();
//     //如果炸了的话用    newuser.save().then((user) => res.send(user));
//     res.send(newuser.user._id);
// })

// router.post("/userupdate", (req, res) => {
//     let e=req.query;
//     if(e.intro.length()>1)User.update({_id:e._id},{$set:{intro:e.intro}},exec());
//     if(e.type.length()>1)User.update({_id:e._id},{$set:{type:e.type}},exec());
//     if(e.regdate.length()>1)User.update({_id:e._id},{$set:{regdate:e.regdate}},exec());
//     if(e.visdate.length()>1)User.update({_id:e._id},{$set:{visdate:e.visdate}},exec());
//     if(e.link.webname.length()>1)User.update({_id:e._id},{$set:{link:e.link}},exec());

// });

module.exports = router;
