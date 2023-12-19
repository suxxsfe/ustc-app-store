

const express = require("express");

const User = require("./models/User.js");
const Private=require("./models/Private.js");
const router = express.Router();
var NodeRSA = require('node-rsa');
const myprivatekey="-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDoUdUWtsIwD78TripgypztKljZdEqNWZg80ZX0QUbn2bQ1zL4U/wH7FEva5hLAQbFBX2hy3xp76iChGatkRdCrdJtJCmPl4+yWd4gQpMTILDHpF5PrA538F/AgVpqt7CLqMorohXM3XqSI+k6WqNc4+LIyNclZ+nEiYSIX/sNhwUYFps+2HLlbBernAPJKq2GODz/rGY+S8nB5neVJkrZtnTa5V/tz5nJ81w+BAJRjB+WdhyFyF7Qz7N0MbasYTUPgvBoUM/a23mAb/nwSK9hA1KdV5xIUZD2AOuk6+ZuQHdqQ2knyzm2c9W803hSDiv8kUJN0fZvnjMGuem+kHLKLAgMBAAECggEAGeuHatFZOSOInhmAgOwaNhvTbe+bocmtQpvfrzDZSGTxxk7hplYNUoYhMHsa/HhX3oNWk/pwagLlQRQsGzPu5DJOYQfXvX6AlwkfFTxM+Eh2CRuoVUBCEC5bjEAdYepGuvqIpQi+oh7dHKtQuV59JM4ak5+Mp41ZsgxEUYkLI4zGZJfdYxK7CiDO9I1QDh366MRqDS4zqDsb3s/ToqWKNgOJkgwKhG7920wydhvNnQOtJZGKtHZv/uW0tisqsqg+Sp5QUIQ4x/nYh6Gnb3JNPI4BpfwzH8/mbpVnEsP9kyaNSU7rUSyseVvavBmnEiCiYkgdFcpCl/bE+x3vMA8rAQKBgQD5VXIZZgV1intokAE+FJOAn7hRK587eiem7/9icsvFHHJp3MX/D2crm3k1k3RT2ar+r7lFRsu5Mwnvd4tIpSB4hP7MueS4GuO9WspF/+PHaH5h4s9myp+a0iZfky8QlUebzs2pAfIS/ip3GApIloTwUayCWEuT9VYRarpkBP31mQKBgQDuh+8uXhdUutbvYuSnfL5+qgWbyUWkiW42/Auo2CLr3vhmJ2/vfe6r6WrQUwAT+VpOPNWxYrbRXR2evcgGqEnj5+buuWFnopvyztoOQq0DcN8EVFuxB4/Cqb6iBGSUQLbcLA4lsvY0UTJ1UDW3WN4gpXWYL4tdkzdbDU+mTNT3wwKBgQDBI00lG4AzEriRwKsVub6grhiK1+2alv9MMzByxFXQND70fg3pi7bxcperxrMfmMb6ToiHf1Wj+kNB+iosdaz3bp4pW/4uFrY/Iar6GkQJXYo4rQbXqzGDLjKHam3UvK4hpUpuFpG74KJoanjczavgtIOa3GZ/EFZBW5lSjQNkUQKBgC5Mwnd8mgi/T5Md3gZIp21MsVQA6Hy8lGEl4Vl/wp+IIy0pAIg7KIXEBBC127EE2KuREWWiJJxU97flXJs2NUmArQmvgCGupZim4BqehJjDYvajLT0am6QMcM1gDunb+eKYxpI4v6N+E05EKHkTTeKGW2IT8HhUaA1LcydziG8jAoGBAM+u7lIJn5H5bPGNbFIDbsrCx0cmGrz7QPmqSeG9YaHJi5sx5PuFLyv394Gx+ufCUjkKutaimO0UokxrxJVBdbmnZewB8RFBwf9DkYZe7h7tPRRidaz7QFTL4BMXaFuwcDCS9stbyDPhLytCCqZpC7R+TifCsVPYIi1LVR6qPL4Q-----END PRIVATE KEY-----";
const checker = require('./jwtThings.js');
var privateKey = new NodeRSA(myprivatekey);
router.post('/login', async (req, res) => {
    const user = await User.findOne({name: req.body.name});

    if(!user) {
        return res.status(422).send({
        message: '用户名不存在lll'});
    }
    
    privateKey.setOptions({encryptionScheme: 'pkcs1'});
    var password = privateKey.decrypt(req.body.password, 'utf8');
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

