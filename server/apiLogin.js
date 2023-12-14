

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
})
router.post("/userCreate", (req, res) => {
    
    let nowDate = new Date().toLocaleDateString();
    const newuser = new User({
        name:req.body.name,
        intro:req.body.intro,
        password:req.body.password,
        regdate:nowDate,
        visdate:nowDate,
        projects:req.body.projects,
        links:req.body.links,
        type:req.body.type,
    });
    const token = jwt.sign({ id: String(newuser._id)}, SECRET)
    newuser.save().then((user) => res.send({user,token}));
});


module.exports = router;

