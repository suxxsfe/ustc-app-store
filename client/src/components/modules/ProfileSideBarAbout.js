import React, { Component } from "react";

class ProfileSideBarAbout extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="profile-sidebar-about">
        About:
        <ul className="profile-sidebar-about-list">
          <li>用户类型：普通用户</li>
          <li>注册时间：1111111</li>
          <li>最后访问：2222222</li>
        </ul>
      </div>
    );
  }
}

export default ProfileSideBarAbout;

