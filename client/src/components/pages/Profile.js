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
        <ProfileHeader userId={this.props.userId} />
        <div className="profile-main">
          <Projects userId={this.props.userId} />
          <ProfileSideBar userId={this.props.userId} />
        </div>
      </>
    );
  }
}

export default Profile;

