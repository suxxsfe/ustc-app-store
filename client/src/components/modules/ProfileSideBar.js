import React, { Component } from "react";

import ProfileSideBarAbout from "./ProfileSideBarAbout.js";
import ProfileSideBarLinks from "./ProfileSideBarLinks.js";

class ProfileSideBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="profile-sidebar">
        <ProfileSideBarAbout />
        <ProfileSideBarLinks />
      </div>
    );
  }
}

export default ProfileSideBar;

