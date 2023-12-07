
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
        const newApp = new App({
            _id: (req.query._id !== undefined ? req.query.id : 114514),
            name:req.query.name,
            authors:[{name: "qwerty", _id: 123}],
            img_url:req.query.img_url,
            downloads:req.query.downloads,
            links: req.query.links,
            tags:req.query.tags,
            platforms:req.query.platforms,
            describe:req.query.description,
        });
        
        newApp.save().then((app) => {
            console.log("success");
            res.send(app);
		});
	
 //   }else{
        // App.update({_id:req.query._id},{$set:{
        //     name:req.query.name,
        //     platforms:req.query.platforms,
        //     describe:req.query.describe,
        //     links:{
        //         web:req.query.links.name,
        //         url:req.query.links.url,
        //     },
        // }},exec());
   // }
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
