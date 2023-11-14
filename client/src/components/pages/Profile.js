import React, { Component } from "react";

import ProfileHeader from "../modules/ProfileHeader.js";
import ProfileProjects from "../modules/ProfileProjects.js";
import ProfileSideBar from "../modules/ProfileSideBar.js";

class Profile extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <>
        <ProfileHeader />
        <ProfileProjects />
        <ProfileSideBar />
      </>
    );
  }
}

export default Profile;

