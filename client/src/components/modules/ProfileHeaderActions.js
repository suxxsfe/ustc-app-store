import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileHeaderActions extends Component{
  constructor(props){
    super(props);
  }
  
  static contextTypes = {
    whoami: PropTypes.object,
  }

  render(){
    return (
      <div className="profile-header-actions">
        {
          this.props._id == this.context.whoami._id ?
          (
            <a href={"/user/"+this.props._id+"/settings"}>
              <button>管理</button>
            </a>
          ) :
          null
        }
      </div>
    );
  }
}

export default ProfileHeaderActions;

