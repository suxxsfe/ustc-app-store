import React, { Component } from "react";

import ProfileHeader from "../modules/ProfileHeader.js";
import Projects from "../modules/Projects.js";
import { ProfileSideBar } from "../modules/SideBar.js";

import { get } from "../../utilities.js";

import "./Profile.css";
import "../modules/Header.css";

class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      intro: "",
      logo: "",
      visdate: "",
      regdate: "",
      links: [],
      type: "",
    };
  }
  
  componentDidMount(){
    get("/api/userinfo", {_id: this.props.userId})
    .then((info) => {
      this.setState(info);
    });
  }

  render(){
    return (
      <>
        <ProfileHeader _id={this.props.userId} name={this.state.name}
                       logo={"/upload/userlogo/"+this.props.userId} intro={this.state.intro}
        />
        <div className="profile-main">
          <Projects userId={this.props.userId} />
          <ProfileSideBar type={this.state.type} links={this.state.links}
                          visdate={this.state.visdate} regdate={this.state.regdate}
          />
        </div>
      </>
    );
  }
}

export default Profile;

