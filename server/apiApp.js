
//asdfsda

const express = require("express");
//asdsfaf

const App = require("./models/App.js");

const Tags = require("./models/Tags.js");

const router = express.Router();

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
            authors: [{name: "qwerty", _id: 123}],
            img_url: req.body.img_url,
            downloads: req.body.downloads,
            links: req.body.links,
            tags: tags,
            platforms: req.body.platforms,
            describe: req.body.description,
            createdate: nowDate,
            updatedate: nowDate,
        }).save())
        .then((app) => {
            console.log("success");
            res.send(app);
        });
    }
    else{
      
      getTagsByTagIds(req.body.tags)
      .then((tags) => App.update({_id:req.query._id},{$set:{
          name: req.body.name,
          img_url: req.body.img_url,
          downloads: req.body.downloads,
          links: req.body.links,
          tags: req.body.tags,
          platforms: req.body.platforms,
          describe: req.body.description,
          updatedate: nowDate,
      }},exec()))
      .then((app) => {
          console.log("success");
          res.send(app);
      });
    }
});

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    return cb(null, path.join(__dirname, "upload", "applogo"));
  },
  filename: function(req, file, cb){
    return cb(null, file.fieldname+'-'+Date.now());
  },
})
const upload = multer({ storage: storage, limits: {fileSize: 1024*1024*10} });

const fs = require("fs");
router.post("/appinfo/logo", upload.single("file"), (req, res) => {
  let { size, mimetype, path } = req.file;
  const allowType = ["jpeg", "jpg", "png"];
  const yourType = mimetype.split('/')[1];
  
  if(size > 1232896){
    return res.status(500).send("size too large");
  }
  else if(allowType.indexOf(yourType) === -1){
    return res.status(500).send("wrong photo format");
  }
  else{
    //TODO: check Authorization
    if(/*Authorization checked*/true){
      App.findOne({_id: req.body._id})
      .then((app) => {
        fs.unlink(app.logo);
        App.findOneAndUpdate({_id: req.body._id}, {
          logo: "public/applogo/"+req.file.filename,
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
      fs.unlink(path.join(__dirname, "upload", "applogo", req.file.filename));
    }
  }
});

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
