import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import NewProject from "../modules/NewProject.js";
import { getLoggedInfo } from "../../utilities.js";

class NewProjectPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      set: undefined,
    };
  }
  
  static contextTypes = {
    whoami: PropTypes.object,
  }
  
  componentDidMount(){
  }
  
  handleSet(appId){
    this.setState({
      set: appId,
    });
  }

  render(){
    if(this.context.whoami._id == 0){
      return <Navigate to="/signin" state={{
        from: "/new",
        message: {type: "fail", content: "请先登陆"}
      }} />;
    }
    else if(this.state.set){
      return <Navigate to={"/app/"+this.state.set+"/settings"} state={{
        from: "/new",
        message: {type: "success", content: "创建成功，请继续完善信息"}
      }} />;
    }
    else{
      return <NewProject appId={undefined} successSetHook={this.handleSet.bind(this)} />;
    }
  }
}

export default NewProjectPage;

