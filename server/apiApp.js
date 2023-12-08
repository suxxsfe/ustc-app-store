
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
    App.findOne({_id: req.query._id}).then((tmp)=>{res.send(tmp)});
 //   res.send(tmp);
});
router.get("/appdescribe", (req, res) => {
    App.findOne({_id: req.query._id}).then((tmp)=>{res.send(tmp)});
});
router.get("/appdownload", (req, res) => {
    App.findOne({_id: req.query._id}).then((tmp)=>{res.send(tmp)});
});

router.post("/appinfo", (req, res) => {
    console.log("kkksc03");
    
    let nowDate = new Date().toLocaleDateString();
  
    if(req.body._id === undefined){
      console.log(req.body);
      const newApp = new App({
          name: req.body.name,
          authors: [{name: "qwerty", _id: 123}],
          img_url: req.body.img_url,
          downloads: req.body.downloads,
          links: req.body.links,
          tags: req.body.tags,
          platforms: req.body.platforms,
          describe: req.body.description,
          createdate: nowDate,
          updatedate: nowDate,
      });
      
      newApp.save().then((app) => {
          console.log("success");
          res.send(app);
  		});
    }
    else{
        App.update({_id:req.query._id},{$set:{
            name: req.body.name,
            img_url: req.body.img_url,
            downloads: req.body.downloads,
            links: req.body.links,
            tags: req.body.tags,
            platforms: req.body.platforms,
            describe: req.body.description,
            updatedate: nowDate,
        }},exec()).then((app) => {
          console.log("success");
          res.send(app);
        });
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
