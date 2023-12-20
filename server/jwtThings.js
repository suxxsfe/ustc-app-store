const jwt = require('jsonwebtoken');
const App = require("./models/App.js");
const SECRET = process.env.jwtsecret;
function signID(id){
  return jwt.sign({ id: String(id)}, SECRET);
}
function getID(token){
  if(token==""||token==null)return 0;
  return jwt.verify(token.split(' ')[1], SECRET).id;
}
function checkAuthorityApp(token,id){
 // console.log("Checking token");
 return new Promise((resolve,reject)=>{
  const user=getID(token);
  App.findOne({_id:id}).then((app)=>{
    if(app==null){reject("no such app");}
    else if(app.authors.map((author)=>{return user==author._id;}).includes(true)){
      resolve(true);
    }else{
      reject("no Authorization");
    }
  }); 
 })
}

function checkAuthorityUser(token,id){
    return getID(token)==id;
}

module.exports={ signID,getID, checkAuthorityUser, checkAuthorityApp};
