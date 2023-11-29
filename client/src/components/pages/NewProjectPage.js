import React, { Component } from "react";

import NewProject from "../modules/NewProject.js";

class NewProjectPage extends Component{
  constructor(props){
    super(props);
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

