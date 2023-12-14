
const m3u8Make = require("./m3u8Maker.js");

//asdfsda

const express = require("express");
//asdsfaf

const App = require("./models/App.js");

const Tags = require("./models/Tags.js");

const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = 'somesecret';
function getID(token){
    return jwt.verify(token, SECRET).id;
}
function checkAuthorityApp(token,id){
  console.log("Checking token");
  App.findOne({_id:id}).then((app)=>{
    return app.authors.map((author)=>{return String(author._id);}).includes(getID(token));
  }); 
}
// router.get("/test",(req, res)=>{
//   console.log(req.query);
//   let e=checkAuthorityApp(req.query.token,req.query._id);
//   console.log(e);
//   res.send(e);
// });
router.get("/tags", (req, res) => {
    Tags.find({}).then((tmp)=>res.send(tmp));
});
//aeatea
router.get("/appinfo", (req, res) => {
    App.findOne({_id: req.query._id})
    .then((tmp)=>{res.send(tmp)})
    .catch((error) => {
      console.log("data base not found: \n"+error);
      res.status(404).send({});
    });
 //   res.send(tmp);
});
router.get("/appdescribe", (req, res) => {
    App.findOne({_id: req.query._id})
    .then((tmp)=>{res.send(tmp)})
    .catch((error) => {
      console.log("data base not found: \n"+error);
      res.status(404).send({});
    });
});
router.get("/appdownload", (req, res) => {
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
    console.log("kkksc03");
    
    let nowDate = new Date().toLocaleDateString();
  
    if(req.body._id === undefined){
        console.log(req.body);
        
        getTagsByTagIds(req.body.tags)
        .then((tags) => new App({
            name: req.body.name,
            authors: [{name: "qwerty", _id: 123}],//TODO: 
            describe: req.body.description,
            createdate: nowDate,
            updatedate: nowDate,
        }).save())
        .then((app) => {
            console.log("success");
            res.send(app);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
    }
    else{
      
      getTagsByTagIds(req.body.tags)
      .then((tags) => App.findOneAndUpdate({_id:req.body._id},{
          links: req.body.links,
          tags: tags,
          platforms: req.body.platforms,
          describe: req.body.description,
          updatedate: nowDate,
      },{new: true}))
      .then((app) => {
          console.log("success");
          res.send(app);
      })
      .catch((error) => {
        console.log(error);
        res.state(500).send(error);
      });
    }
});

const multer = require("multer");
const path = require("path");
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
const videoUpload = multer({ storage: videoStorage, limits: {fileSize: 1024*1024*100} });
const logoUpload = multer({ storage: logoStorage, limits: {fileSize: 1024*1024*10} });
const downloadUpload = multer({ storage: downloadStorage, limits: {fileSize: 1024*1024*100}, fileFilter });

const fs = require("fs");
router.post("/appinfo/logo", logoUpload.single("file"), (req, res) => {
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
    if(checkAuthorityApp(req.body.token,req.body._id)){
      App.findOne({_id: req.body._id})
      .then((app) => (App.findOneAndUpdate({_id: req.body._id}, {
          logo: "upload/applogo/"+req.file.filename,
        }, {new: true})))
      .then((logo) => {
        res.send(logo);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else{
//      fs.unlink(path.join(__dirname, "upload", "applogo", req.file.filename));
    }
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
    if(checkAuthorityApp(req.body.token,req.body._id)){
      const videoDir = path.join(__dirname, "upload", "appvideo", req.file.filename+"ts");
      fs.mkdirSync(videoDir);
      fs.renameSync(path.join(__dirname, "upload", "appvideo", req.file.filename),
                    path.join(videoDir, req.file.filename+"."+yourType));
      makeM3u8(path.join(videoDir, req.file.filename+"."+yourType),
               path.join(videoDir, req.file.filename+".m3u8"));
      App.findOne({_id: req.body._id})
      .then((app) => (App.findOneAndUpdate({_id: req.body._id}, {
        video: "upload/appvideo/"+req.file.filename+"ts/"+req.file.filename+".m3u8",
      }, {new: true})))
      .then((video) => {
        res.send(video);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else{
//      fs.unlink(path.join(__dirname, "upload", "appvideo", req.file.filename));
    }
  }
});
router.post("/appinfo/download", downloadUpload.single("file"), (req, res) => {
  let { size } = req.file;
  if(size > 1024*1024*100){
    return res.status(500).send("size too large");
  }
  else{
    //TODO: check Authorization
    if(checkAuthorityApp(req.body.token,req.body._id)){
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
    }
    else{
      //
    }
  }
});

router.post("/appinfo/deletedownload", (req, res) => {
  //TODO: check Authorization
  if(checkAuthorityApp(req.body.token,req.body._id)){
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
  }
  
})

router.get("/search", (req, res) => {
    if(req.query.tag!=undefined){
        if(req.query.platforms!=undefined){
            App.find({'tag': req.query.tag,platforms:req.query.platforms}).
            then((app)=>res.send(app));
        }else{
            App.find({'tag': req.query.tag}).
            then((app)=>res.send(app));
        }
    }else if(req.query.platforms!=undefined){
        App.find({platforms:req.query.platforms}).
            then((app)=>res.send(app));
    }else{
        App.find({}).
        then((app)=>res.send(app));
    }
});
//neraefads  
module.exports = router;
