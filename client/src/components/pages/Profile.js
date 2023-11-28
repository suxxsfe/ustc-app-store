import React, { Component } from "react";

import ProfileHeader from "../modules/ProfileHeader.js";
import Projects from "../modules/Projects.js";
import { ProfileSideBar } from "../modules/SideBar.js";

import "./Profile.css";
import "../modules/Header.css";

class Profile extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <>
        <ProfileHeader userId={123} />
        <div className="profile-main">
          <Projects userId={123} />
          <ProfileSideBar userId={123} />
        </div>
      </>
    );
  }
}

export default Profile;

