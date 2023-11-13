import React, { Component } from "react";

import AppSideBarAbout from "./AppSideBarAbout.js";
import AppSideBarLinks from "./AppSideBarLinks.js";
import AppSideBarTags from "./AppSideBarTags.js";

class AppSideBar extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="app-sidebar">
        <AppSideBarAbout />
        <AppSideBarLinks />
        <AppSideBarTags />
      </div>
    );
  }
}

export default AppSideBar;

