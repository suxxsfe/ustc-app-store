import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import ProfileSetting from "../modules/ProfileSetting.js";

class ProfileSettingsPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      set: undefined,
    };
  }
  
  handleSet(userId){
    this.setState({
      set: userId,
    });
  }

  render(){
    if(this.state.set){
      return <Navigate to={"/user/"+this.state.set} state={{
        from: "/user/"+this.state.set+"/settings",
        message: {type: "success", content: "修改成功"}
      }} />;
    }
    else{
      return <ProfileSetting userId={this.props.userId} successSetHook={this.handleSet.bind(this)} />
    }
  }
}

export default ProfileSettingsPage;

