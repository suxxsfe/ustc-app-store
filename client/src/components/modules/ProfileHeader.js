import React, { Component } from "react";

import ProfileHeaderDetail from "./ProfileHeaderDetail.js";
import ProfileHeaderActions from "./ProfileHeaderActions.js";

import { get } from "../../utilities.js";

class ProfileHeader extends Component{
  constructor(props){
    super(props);
	this.state = {
	  name: "",
	  intro: "",
	};
  }
	
  componentDidMount(){
	get("/api/userinfo", {_id: this.props.userId}).then((info) => {
	  this.setState({
		name: info.user.name,
		intro: info.intro,
	  });
	});
  }

  render(){
    return (
      <div className="profile-header">
        <img className="user-logo" src="https://himg.bdimg.com/sys/portraitn/item/public.1.f355b4ea.XQ0gvtdscacwVeJkfGxQWw" />
        <h1 className="user-name">{this.state.name}</h1>
        <ProfileHeaderActions />
        <ProfileHeaderDetail intro={this.state.intro}/>
      </div>
    );
  }
}

export default ProfileHeader;

