import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import NewProject from "../modules/NewProject.js";

import { get } from "../../utilities.js";

class AppSettings extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      app: undefined,
    };
  }
  
  handleSet(appId){
    this.setState({
      app: appId,
    });
  }
  
  render(){
    if(this.state.app){
      return <Navigate to={"/app/"+this.state.app} state={{
        from: "/app/"+this.state.set+"/settings",
        message: {content: "修改成功", type: "success"}
      }} />;
    }
    else{
      return <NewProject appId={this.props.appId} successSetHook={this.handleSet.bind(this)} />;
    }
  }
}

export default AppSettings;

