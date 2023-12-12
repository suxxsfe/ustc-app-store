import React, { Component } from "react";

import NewProject from "../modules/NewProject.js";
import { getLoggedInfo } from "../../utilities.js";

class NewProjectPage extends Component{
  constructor(props){
    super(props);
    
    if(!getLoggedInfo()){
      location.href = "/signin";
    }
  }

  render(){
    return (
      <NewProject appId={undefined} />
    );
  }
}

export default NewProjectPage;

