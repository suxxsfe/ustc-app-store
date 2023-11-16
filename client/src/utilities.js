
const convertToJSON = (res) => {
  if(!res.ok){
    throw "API request failed with status "+res.status+" and text: "+res.statusText;
  }
  
  return res.clone()
            .json()
            .catch((error) => {
              return res.text().then((text) => {
                throw "API request's result could not be convert to JSON object:\n"+text;
              });
            });
}

const post = (endpoint, params = {}) => {
  console.log("send to server (post): "+JSON.stringify(params));
}

export { post };

