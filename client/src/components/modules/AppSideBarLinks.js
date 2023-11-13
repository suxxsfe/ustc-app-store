import React, { Component } from "react";

class AppSideBarLinks extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="app-sidebar-links">
        Links:
        <ul className="app-sidebar-links-list">
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

export default AppSideBarLinks;

