
const express = require("express");
const User = require("./models/User.js");
const router = express.Router();
const checker = require('./jwtThings.js');
router.get("/userinfo", (req, res) => {
    User.findOne({_id:req.query._id}).then((tmp)=>{tmp.password="?????";res.send(tmp)});
});
router.get("/userprojects", (req, res) => {
    User.findOne({_id:req.query._id},{"projects":1}).then((tmp)=>res.send(tmp));
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
  console.log(req);
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
    if(checker.checkAuthorityUser(req.body.token,req.body._id)){
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

module.exports = router;
