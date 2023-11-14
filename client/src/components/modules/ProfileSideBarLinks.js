import React, { Component } from "react";

class ProfileSideBarLinks extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="profile-sidebar-links">
        Links:
        <ul className="profile-sidebar-links-list">
          <li>
            <a href="www.bilibili.com">
              TODO: img
            </a>
            bilibili
          </li>
        </ul>
      </div>
    );
  }
}

export default ProfileSideBarLinks;

