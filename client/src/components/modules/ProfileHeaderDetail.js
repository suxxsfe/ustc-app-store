import React, { Component } from "react";

class ProfileHeaderDetail extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="profile-header-detail">
        <p>{this.props.intro}</p>
      </div>
    )
  }
}

export default ProfileHeaderDetail;

