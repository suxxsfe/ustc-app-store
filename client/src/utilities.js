


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

const formatParams = (params) => {
  // iterate of all the keys of params as an array,
  // map it to a new array of URL string encoded key,value pairs
  // join all the url params using an ampersand (&).
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
}

const post = (endpoint, params, isFormData = false) => {
 /// console.log("send to server (post): "+JSON.stringify(params));
 //过于玄学，反正之前post的body传不过去现在能了。
  if(isFormData){
    params.append("Authorization", "Bearer "+window.localStorage.getItem("token"));
  }
  else{
    params.Authorization = "Bearer "+window.localStorage.getItem("token");
  }
  console.log("send to server (post): "+(isFormData ? params : JSON.stringify(params)));
  
  return fetch(endpoint, {
    method: "post",
    headers: isFormData ? {} : {"Content-type": "application/json" },
    body: isFormData ? params : JSON.stringify(params),
  }).then(convertToJSON)
    .catch((error) => {
      throw "POST request to "+endpoint+" fail with error:\n"+error;
    });
}

const get = (endpoint, params = {}) => {
  const fullPath = endpoint + "?" + formatParams(params);
  return fetch(fullPath)
    .then(convertToJSON)
    .catch((error) => {
      // give a useful error message
      throw "GET request to "+fullPath+" failed with error:\n"+error;
    });
}


const getLoggedInfo = () => {
  let token = null;
  
  token = window.localStorage.getItem("token");
  if(!token){
    token = window.sessionStorage.getItem("token");
  }
  
  return token;
}

export { post, get, getLoggedInfo };

