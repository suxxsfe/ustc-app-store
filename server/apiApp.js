
//asdfsda

const express = require("express");
//asdsfaf

const App = require("./models/app.js");

const Tags = require("./models/Tags.js");

const router = express.Router();

router.get("/tags", (req, res) => {
    res.send(Tags);
});

router.get("/appinfo", (req, res) => {
    App.find({_id: req.query._id}),then((app)=>res.send(app));
});
router.get("/appdescribe", (req, res) => {
    App.find({_id: req.query._id}),then((app)=>res.send(app));
});
router.get("/appdownload", (req, res) => {
    App.find({_id: req.query._id}),then((appdown)=>res.send({downloads:appdown}));
});

router.post("/appinfo", (req, res) => {
    for(let i=0;i<req.query.tags.length();i++){
        const tmp=req.query.tags[i];
        let ok=1;
        Tags.find({name:tmp}),then((tp)=>{ok=tp.length()})
        if(ok==0){
            const newTag = new Tag({
                _id:Tags.length()+1,
                name:req.query.tags,
            });   
            newTag.save();
        }
    }
    const newApp = new App({
        _id:App.length(),
        name:"hello",
        authors:["Sba","Asb"],
        creatdate:"111",
        updatedate:"222",
        links:{
            name:"123",
            url:"I don't know",
        },
        tags:["1"],
        platforms:["windows"],
        describe:"what????",
    });
    newApp.save().then((app) => res.send(app));
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