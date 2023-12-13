import React, { Component } from "react";

class ProfileHeaderActions extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="profile-header-actions">
        <a href={"/user/"+this.props._id+"/settings"}>
          <button>管理</button>
        </a>
      </div>
    );
  }
}

export default ProfileHeaderActions;

