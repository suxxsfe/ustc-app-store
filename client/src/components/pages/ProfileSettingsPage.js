import React, { Component } from "react";

import ProfileSetting from "../modules/ProfileSetting.js";

class ProfileSettingsPage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return <ProfileSetting userId={this.props.userId} />
  }
}

export default ProfileSettingsPage;

