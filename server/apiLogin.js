

const express = require("express");

const User = require("./models/User.js");
const Private=require("./models/Private.js");
const router = express.Router();
var NodeRSA = require('node-rsa');const checker = require('./jwtThings.js');

const myprivatekey = process.env.myprivatekey;
var privateKey = new NodeRSA(myprivatekey);
router.post('/login', async (req, res) => {
    const user = await User.findOne({name: req.body.name});

    if(!user) {
        return res.status(422).send({
        message: '用户名不存在lll'});
    }
    
    var password = req.body.password;
    if(password!=user.password) {
        return res.status(422).send({
            message: '密码不正确'
        })
    }
    
    const token = checker.signID(user._id);
    res.send({
        user,
        token
    })
    
});

const fs = require("fs");
const path = require("path");
router.post("/userCreate", (req, res) => {
    
    User.find({name: req.body.name}).then((users) => {
        if(users.length > 0){
          res.status(403).send("用户名重复");
          return;
        }
      
        let nowDate = new Date().toLocaleDateString();
        const newuser = new User({
            name:req.body.name,
            intro: "",
            password:req.body.password,
            regdate:nowDate,
            visdate:nowDate,
            projects: [],
            links: [],
            type: "普通用户",
        });
        const token = checker.signID(newuser._id);
        newuser.save().then((user) => {
          fs.copyFileSync(path.join(__dirname, "upload", "defaultuserlogo.jpeg"),
                          path.join(__dirname, "upload", "userlogo", String(user._id)));
          res.send({user,token});
        });
    });
});


module.exports = router;

