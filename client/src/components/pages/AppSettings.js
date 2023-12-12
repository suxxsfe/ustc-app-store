import React, { Component } from "react";

import NewProject from "../modules/NewProject.js";

import { get } from "../../utilities.js";

class AppSettings extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      app: undefined,
    };
  }
  
  render(){
    return (
      <NewProject appId={this.props.appId} />
    );
  }
}

export default AppSettings;

