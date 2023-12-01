
//asdfsda

const express = require("express");
//asdsfaf

const App = require("./models/App.js");

const Tags = require("./models/Tags.js");

const router = express.Router();

router.get("/tags", (req, res) => {
    res.send(Tags);
});
//aeatea
router.get("/appinfo", (req, res) => {
    App.find({_id: req.query._id}).then((tmp)=>{res.send(tmp)});
 //   res.send(tmp);
});
router.get("/appdescribe", (req, res) => {
    App.find({_id: req.query._id}).then((tmp)=>{res.send(tmp)});
});
router.get("/appdownload", (req, res) => {
    App.find({_id: req.query._id}).then((tmp)=>{res.send(tmp)});
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
            links:{
                web:req.query.links.name,
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
// router.get("/userprojects", (req, res) => {
//     let taghas=1,plathas=1;
//     if(req.tag.length()<2)taghas=0;
//     if(req.tag.length()<2)plathas=1;
//     if(taghas){

//         User.find({tag: req.query._id}),then((user)=>res.send(User));
//     }
// });
//neraefads  
module.exports = router;
