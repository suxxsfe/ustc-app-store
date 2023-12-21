import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            <Link to={"/user/"+this.props._id+"/settings"}>
              <button>管理</button>
            </Link>
          ) :
          null
        }
      </div>
    );
  }
}

export default ProfileHeaderActions;

