

const express = require("express");

const User = require("./models/User.js");

const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = 'somesecret';

router.post('/login', async (req, res) => {
    const user = await User.findOne({name: req.body.name});

    if(!user) {
        return res.status(422).send({
        message: '用户名不存在lll'});
    }

 
    if(req.body.password!=user.password) {
        return res.status(422).send({
            message: '密码不正确'
        })
    }
 
    const token = jwt.sign({ id: String(user._id)}, SECRET);
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
        const token = jwt.sign({ id: String(newuser._id)}, SECRET)
        newuser.save().then((user) => {
          fs.copyFileSync(path.join(__dirname, "upload", "defaultuserlogo.jpeg"),
                          path.join(__dirname, "upload", "userlogo", String(user._id)));
          res.send({user,token});
        });
    });
});


module.exports = router;

