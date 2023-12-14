const jwt = require('jsonwebtoken');
const SECRET = 'somesecret';
function getID(token){
    return jwt.verify(token, SECRET).id;
}
function checkAuthorityApp(token,id){
  console.log(token);console.log(id);
  console.log("Checking token");
  App.findOne({_id:id}).then((app)=>{
    return app.authors.map((author)=>{return String(author._id);}).includes(getID(token));
  }); 
}

function checkAuthorityUser(token,id){
    return getID(token)==id;
}

module.exports={checkAuthorityUser, checkAuthorityApp};