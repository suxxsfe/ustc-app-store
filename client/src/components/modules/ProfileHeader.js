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
        <img src="https://himg.bdimg.com/sys/portraitn/item/public.1.f355b4ea.XQ0gvtdscacwVeJkfGxQWw" />
        <ProfileHeaderDetail />
        <ProfileHeaderActions />
      </div>
    );
  }
}

export default ProfileHeader;

