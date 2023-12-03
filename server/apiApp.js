
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
//    if(req.query._id==null||req.query._id==undefined){
        // for(let i=0;i<req.query.tags.length();i++){
        //     const tmp=req.query.tags[i];
        //     let ok=1;
        //     Tags.find({name:tmp}),then((tp)=>{ok=tp.length()})
        //     if(ok==0){
        //         const newTag = new Tag({
        //             _id:Tags.length()+1,
        //             name:req.query.tags[i],
        //         });   
        //         newTag.save();
        //    }
        const newApp = new App({
            _id:req.query._id>1?req.query.id:1,
            name:req.query.name,
            authors:req.query.authors,
            createdate:req.query.createdate,
            updatedate:req.query.updatedate,
            img_url:req.query.img_url,
            downloads:req.query.downloads,
            links:{
                webname:req.query.links.webname,
                url:req.query.links.url,
            },
            tags:req.query.tags,
            platforms:req.query.platforms,
            describe:req.query.describe,
        });
        //}
        
        newApp.save();
        console.log("success");
        res.send(newAPP);
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
