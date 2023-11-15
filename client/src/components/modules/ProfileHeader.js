import React, { Component } from "react";

import ProfileHeaderDetail from "./ProfileHeaderDetail.js";
import ProfileHeaderActions from "./ProfileHeaderActions.js";

class ProfileHeader extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="profile-header">
        <img className="user-logo" src="https://himg.bdimg.com/sys/portraitn/item/public.1.f355b4ea.XQ0gvtdscacwVeJkfGxQWw" />
        <h1 className="user-name">user_name</h1>
        <ProfileHeaderActions />
        <ProfileHeaderDetail />
      </div>
    );
  }
}

export default ProfileHeader;

