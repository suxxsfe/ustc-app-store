
const m3u8Make = require("./m3u8Maker.js");

//asdfsda

const express = require("express");
//asdsfaf
const checker = require('./jwtThings.js');
const User = require("./models/User.js");
const App = require("./models/App.js");

const Tags = require("./models/Tags.js");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const ObjectId = require('mongoose').Types.ObjectId;
const isValid = (id) => {
  console.log("check is valid: "+id);
  if(id && ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}
// router.get("/test",(req, res)=>{
//   console.log(req.query);
//   let e=checkAuthorityApp(req.query.token,req.query._id);
//   console.log(e);
//   res.send(e);
// });

router.get("/tags", (req, res) => {
  Tags.find({}).then((tags) => res.send(tags))
               .catch((error) => res.status(500).send(error));
})

router.get("/appinfo", (req, res) => {
    if(!isValid(req.query._id)){
      res.status(500).send("fuck you wrong id format");
      return;
    }
    App.findOne({_id: req.query._id})
    .then((tmp)=>{res.send(tmp)})
    .catch((error) => {
      console.log("data base not found: \n"+error);
      res.status(404).send({});
    });
});

router.get("/appdescribe", (req, res) => {
    if(!isValid(req.query._id)){
      res.status(500).send("fuck you wrong id format");
      return;
    }
    App.findOne({_id: req.query._id})
    .then((tmp)=>{res.send(tmp)})
    .catch((error) => {
      console.log("data base not found: \n"+error);
      res.status(404).send({});
    });
});
router.get("/appdownload", (req, res) => {
    if(!isValid(req.query._id)){
      res.status(500).send("fuck you wrong id format");
      return;
    }
    App.findOne({_id: req.query._id})
    .then((tmp)=>{res.send(tmp)})
    .catch((error) => {
      console.log("data base not found: \n"+error);
      res.status(404).send({});
    });
});

const getTagsByTagIds = async function (tagIds){
  return await Promise.all(
    tagIds.map((tagId) => {
      return (async() => {
        return await Tags.findOne({_id: tagId})
      })();
    }),
  );

}

router.post("/appinfo", (req, res) => {
    if(!req.body.Authorization || req.body.Authorization == ""){
      res.status(403).send("please login first");
      return;
    }
  
    User.find({_id: checker.getID(req.body.Authorization)})
    .then((users) => {
        if(users.length != 1){
          res.status(403).send("user not found");
          return;
        }
      
        const user = users[0];
        let nowDate = new Date().toLocaleDateString();
      
        if(req.body._id === undefined){
            getTagsByTagIds(req.body.tags)
            .then((tags) => new App({
                name: req.body.name,
//                authors: [{name: "qwerty", _id: 123}],//TODO: 
                authors: [{name: user.name, _id: user._id}],
                describe: req.body.description,
                createdate: nowDate,
                updatedate: nowDate,
            }).save())
            .then((app) => {
                fs.copyFileSync(path.join(__dirname, "upload", "defaultapplogo.jpg"),
                                path.join(__dirname, "upload", "applogo", String(app._id)));
                console.log("success");
                res.send(app);
            })
            .catch((error) => {
              console.log(error);
              res.status(500).send(error);
              return;
            });
        }
        else{
          if(!isValid(req.body._id)){
            res.status(500).send("fuck you wrong id format");
            return;
          }
          
          App.find({_id: req.body._id}).then((apps) => {
              if(apps.length != 1){
                  res.status(403).send("app not found");
                  return;
              }
              if(!apps[0].authors.map((author) => (String(author._id))).includes(user.id)){
                  res.status(403).send("permission deny");
                  return;
              }
              getTagsByTagIds(req.body.tags)
              .then((tags) => App.findOneAndUpdate({_id:req.body._id},{
                  links: req.body.links,
                  tags: tags,
                  platforms: req.body.platforms,
                  describe: req.body.description,
                  updatedate: nowDate,
                  web: req.body.web,
              },{new: true}))
              .then((app) => {
                  console.log("success");
                  res.send(app);
              })
              .catch((error) => {
                  console.log(error);
                  res.status(500).send(error);
                  return;
              });
          });
        }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("user not found");
    })
});

const multer = require("multer");
const logoStorage = multer.diskStorage({
  destination: function(req, file, cb){
    return cb(null, path.join(__dirname, "upload", "applogo"));
  },
  filename: function(req, file, cb){
    return cb(null, file.fieldname+'-'+Date.now()+"."+file.mimetype.split('/')[1]);
  },
});
const videoStorage = multer.diskStorage({
  destination: function(req, file, cb){
    return cb(null, path.join(__dirname, "upload", "appvideo"));
  },
  filename: function(req, file, cb){
    return cb(null, file.fieldname+'-'+Date.now());
  },
});
const downloadStorage = multer.diskStorage({
  destination: function(req, file, cb){
    return cb(null, path.join(__dirname, "upload", "appdownload"));
  },
  filename: function(req, file, cb){
    return cb(null, file.fieldname+'-'+Date.now()+"-"+file.originalname);
  },
});
const fileFilter = (req, file, callback) => {//中文编码支持
  file.originalname = Buffer.from(file.originalname, "latin1").toString("utf-8");
  callback(null, true);
}
const videoUpload = multer({ storage: videoStorage, limits: {fileSize: 1024*1024*100}, fileFilter});
const logoUpload = multer({ storage: logoStorage, limits: {fileSize: 1024*1024*10} });
const downloadUpload = multer({ storage: downloadStorage, limits: {fileSize: 1024*1024*100}, fileFilter });

router.post("/appinfo/logo", logoUpload.single("file"), (req, res) => {
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
    checker.checkAuthorityApp(req.body.Authorization,req.body._id).then(()=>{
      fs.renameSync(path.join(__dirname, "upload", "applogo", req.file.filename),
                    path.join(__dirname, "upload", "applogo", req.body._id));
      res.send({status: "success"});
    }).catch((error) => {res.status(422).send(error);});
  }
});
router.post("/appinfo/video", videoUpload.single("file"), (req, res) => {
  let { size, mimetype } = req.file;
  const allowType = ["ts", "mp4"];
  const yourType = mimetype.split('/')[1];
  
  if(size > 1024*1024*100){
    return res.status(500).send("size too large");
  }
  else if(allowType.indexOf(yourType) === -1){
    return res.status(500).send("wrong photo format");
  }
  else{
    //TODO: check Authorization
    //done
    checker.checkAuthorityApp(req.body.Authorization,req.body._id).then(()=>{
      const videoDir = path.join(__dirname, "upload", "appvideo", req.file.filename+"ts");
      fs.mkdirSync(videoDir);
      fs.renameSync(path.join(__dirname, "upload", "appvideo", req.file.filename),
                    path.join(videoDir, req.file.filename+"."+yourType));
      makeM3u8(path.join(videoDir, req.file.filename+"."+yourType),
               path.join(videoDir, req.file.filename+".m3u8"));
      App.findOne({_id: req.body._id})
      .then((app) => (App.findOneAndUpdate({_id: req.body._id}, {
        video: "upload/appvideo/"+req.file.filename+"ts/"+req.file.filename+".m3u8",
        videoname: req.file.originalname,
      }, {new: true})))
      .then((video) => {
        res.send(video);
      })
      .catch((error) => {
        console.log(error);
      });
    }).catch((error) => {res.status(422).send(error);});
  }
});
router.post("/appinfo/download", downloadUpload.single("file"), (req, res) => {
  let { size } = req.file;
  if(size > 1024*1024*100){
    return res.status(500).send("size too large");
  }
  else{
    //TODO: check Authorization
    checker.checkAuthorityApp(req.body.Authorization,req.body._id).then(()=>{
      const newDownload = {
        filename: req.file.originalname,
        id: req.body.id,
        path: "upload/appdownload/"+req.file.filename,
        platform: req.body.platform,
        uploaddate: new Date().toLocaleDateString(),
      };
      App.findOne({_id: req.body._id})
      .then((app) => (App.findOneAndUpdate({_id: req.body._id}, {
        downloads: app.downloads.filter((item) => (item.id === req.body.id)).length ? 
                   (app.downloads.map((item) => (item.id === req.body.id ? newDownload : item))) :
                   ([...app.downloads, newDownload]),
        }, {new: true})))
      .then((app) => {
        res.send(app);
      })
      .catch((error) => {
        console.log(error);
      });
    }).catch((error) => {res.status(422).send(error);});
  }
});

router.post("/appinfo/deletedownload", (req, res) => {
  //TODO: check Authorization
  checker.checkAuthorityApp(req.body.Authorization,req.body._id).then(()=>{
     App.findOne({_id: req.body._id})
    .then((app) => {
      App.findOneAndUpdate({_id: req.body._id}, {
        downloads: app.downloads.filter((item) => (item.id !== req.body.id)),
      }, {new: true})
      .then((app) => {
        res.send(app);
      })
      .catch((error) => {
        console.log(error);
      });
    })
  }).catch((error) => {res.status(422).send(error);});
  
})

router.get("/search", (req, res) => {
    let option={};
    if(req.query.content!="") {option["name"]={$regex:req.query.content};}
    if(req.query.platform!="all")option["platforms"]=req.query.platform;
    if(req.query.tag!="all")option["tags"]={$elemMatch:{name:req.query.tag}}
    App.find(option). then((app)=>res.send({projects:app})).catch((err)=>res.status(422).send("nofile"+error));
  //   if(req.query.platforms!="all"){
  //     App.find({tags: {$elemMatch:{name:req.query.tag}},"platforms":req.query.platforms,                                                          name:{$regex:searchName}}).
  //       then((app)=>res.send({projects:app}));
  //     }else{
  //      App.find({tags: {$elemMatch:{name:req.query.tag}},name:{$regex:searchName}}).
  //       then((app)=>res.send({projects:app}));
  //  }
});
//neraefads  
router.get("/applist",(req,res)=>{
 // console.log(App.find({}).sort({createdate:1,name:1}));
  App.find({}).sort({createdate:1,name:1}).then((app)=>{res.send(app)});
})
router.post("/appdelete",(req,res)=>{
  // console.log(req.body);
  // console.log(req.query);
  checker.checkAuthorityApp(req.query.Authorization,req.query._id).then((result)=>{
    App.deleteOne({_id:req.query._id}).then(res.status(200).send("完成"+result)).catch(()=>console.log("error"));
  }).catch((error)=>res.status(422).send(error));
});
module.exports = router;
