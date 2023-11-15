import React, { Component } from "react";

import ProfileHeader from "../modules/ProfileHeader.js";
import ProfileProjects from "../modules/ProfileProjects.js";
import ProfileSideBar from "../modules/ProfileSideBar.js";

import "./Profile.css";
import "../modules/Header.css";

class Profile extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <>
        <ProfileHeader />
        <div className="profile-main">
          <ProfileProjects />
          <ProfileSideBar />
        </div>
      </>
    );
  }
}

export default Profile;

