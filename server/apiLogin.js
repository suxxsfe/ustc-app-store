

const express = require("express");

const User = require("./models/User.js");
const Private=require("./models/Private.js");
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = 'somesecret';
var NodeRSA = require('node-rsa');
router.post('/login', async (req, res) => {
    const user = await User.findOne({name: req.body.name});

    if(!user) {
        return res.status(422).send({
        message: '用户名不存在lll'});
    }

    let privateKey;
Private.findOne({}).then((key)=>{

    var privateKey = new NodeRSA(key.name);
        privateKey.setOptions({
            // 这里需要指定RSA padding模式为pkcs1，这是因为前端jsencrypt库采用了pkcs1，而后端node-rsa默认使用的pkcs1_oaep
            // https://stackoverflow.com/questions/33837617/node-rsa-errors-when-trying-to-decrypt-message-with-private-key
            encryptionScheme: 'pkcs1'
        });

        // 对数据进行解密
        var password = privateKey.decrypt(req.body.password, 'utf8');
    // const decrypt = new NodeRSA();
    // decrypt.setPrivateKey(key.name);
    // const password = decrypt.decrypt(req.body.password, 'utf8');
    // // privatekey=key.name;
    
    // let buffer1 = Buffer.from(req.body.password, 'base64'); //转化格式
    // let password = crypto.privateDecrypt({
    //     key: privateKey,
    //  //   padding: crypto.constants.RSA_PKCS1_PADDING // 注意这里的常量值要设置为RSA_PKCS1_PADDING
    // }, buffer1).toString('utf8');

    if(password!=user.password) {
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

