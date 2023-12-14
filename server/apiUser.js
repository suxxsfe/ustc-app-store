
const express = require("express");
const User = require("./models/User.js");
const router = express.Router();


const checker = require('./jwtThings.js');


router.post("/whoami", (req, res) => {
    const userId = getID(req.body.Authorization);
    if(!userId){
      res.send({_id: 0, name: "", type: ""});
    }
    User.findOne({_id: userId})
        .then((user) => res.send({_id: userId, name: user.name, type: user.type, }))
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
})

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
  let { size, mimetype } = req.file;
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
    if(checker.checkAuthorityUser(req.body.Authorization,req.body._id)){
      fs.renameSync(path.join(__dirname, "upload", "userlogo", req.file.filename),
                    path.join(__dirname, "upload", "userlogo", req.body._id));
      res.send({status: "success"});
    }
    else{
//      fs.unlink(path.join(__dirname, "upload", "userlogo", req.file.filename));
    }
  }
});

module.exports = router;
