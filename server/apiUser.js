
const express = require("express");
const User = require("./models/User.js");
const App = require("./models/App.js");
const router = express.Router();


const checker = require('./jwtThings.js');
const ObjectId = require('mongoose').Types.ObjectId;

const isVaild = (id) => {
  if(id && ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

router.post("/whoami", (req, res) => {
    const userId = checker.getID(req.body.Authorization);
    if(!userId){
      res.send({_id: 0, name: "", type: ""});
    }
  
    let nowDate = new Date().toLocaleDateString();
  console.log(nowDate);
    User.findOneAndUpdate({_id: userId}, {visdate: nowDate}, {new: true})
        .then((user) => res.send({_id: userId, name: user.name, type: user.type, }))
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
})

router.get("/userinfo", (req, res) => {
  if(!req.query._id || !isVaild(req.query._id)){
    console.log("fuck you, wrong id");
    res.status(404).send("wrong id format");
    return;
  }
  
    User.find({_id:req.query._id})
    .then((tmp)=>{
      if(tmp.length != 1){
          res.status(404).send("not found");
      }
      else{
          tmp[0].password="?????";
          res.send(tmp[0])
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send(e);
    })
});
router.get("/userprojects", (req, res) => {

  console.log(User);  console.log(req.query);

  if(!req.query._id || !isVaild(req.query._id)){
    console.log("fuck you, wrong id");
    res.status(404).send("wrong id format");
    return;
  }
  
  App.find({authors:{$elemMatch:{_id:req.query._id}}}).then((apps) => res.send(apps))
    .catch((error) => {
      console.log(error);
      res.status(500).send("failed");
    });
});
router.post("/userinfo", (req, res) => {
    const id = checker.getID(req.body.Authorization);
    if(id != req.body._id){
      res.status(403).send("permission deny");
      return;
    }
  
    User.findOneAndUpdate({_id:id},{
        intro: req.body.intro,
        links: req.body.links,
    }, {new: true})
    .then((user)=>res.send(user));

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
router.get("/userlist",(req,res)=>{
    User.find({}).sort({type:1,tags:-1,name:1}).then((users)=>res.send(users));
});
router.get("/searchUser", (req, res) => {
    let option={};
    if(req.query.content!="") {option["name"]={$regex:req.query.content};}
    if(req.query.project!="all"&&req.query.project!="")option["projects"]=req.query.project;
    User.find(option).then((user)=>res.send(user));
  //   if(req.query.platforms!="all"){
  //     App.find({tags: {$elemMatch:{name:req.query.tag}},"platforms":req.query.platforms,                                                          name:{$regex:searchName}}).
  //       then((app)=>res.send({projects:app}));
  //     }else{
  //      App.find({tags: {$elemMatch:{name:req.query.tag}},name:{$regex:searchName}}).
  //       then((app)=>res.send({projects:app}));
  //  }
});
module.exports = router;
