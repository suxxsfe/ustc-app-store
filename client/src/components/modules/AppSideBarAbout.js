import React, { Component } from "react";

class AppSideBarAbout extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="app-sidebar-about">
        About:
        <ul className="app-sidebar-about-list">
          <li>创建时间: 1111111</li>
          <li>最后编辑: 2222222</li>
          <li>支持平台: Windows Web</li>
        </ul>
      </div>
    );
  }
}

export default AppSideBarAbout;

