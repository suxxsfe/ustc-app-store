const jwt = require('jsonwebtoken');
const SECRET = 'somesecret';
const App = require("./models/App.js");

function getID(token){
  return jwt.verify(token.split(' ')[1], SECRET).id;
}
function checkAuthorityApp(token,id){
  return App.findOne({_id:id}).then((app)=>{
    return app.authors.map((author)=>{return String(author._id);}).includes(getID(token));
  });
}

function checkAuthorityUser(token,id){
    return getID(token)==id;
}

module.exports={ getID, checkAuthorityUser, checkAuthorityApp};
