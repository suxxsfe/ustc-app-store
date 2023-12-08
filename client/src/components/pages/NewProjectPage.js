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
      <NewProject _id={undefined} name="" description=""
                  selected_tags={[]} selected_platforms={[]}
                  links={[{name: "", url: ""}]} downloads={[]}
      />
    );
  }
}

export default NewProjectPage;

