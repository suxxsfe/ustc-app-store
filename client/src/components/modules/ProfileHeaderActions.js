import React, { Component } from "react";

class ProfileHeaderActions extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="profile-header-actions">
        <a href="www.baidu.com">
          <button>管理</button>
        </a>
        <a href="www.baidu.com">
          <button>个人设置</button>
        </a>
      </div>
    );
  }
}

export default ProfileHeaderActions;

