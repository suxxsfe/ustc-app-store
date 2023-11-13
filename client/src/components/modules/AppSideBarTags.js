import React, { Component } from "react";

class AppSideBarTags extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="app-sidebar-tags">
        Tags:
        <ul className="app-sidebar-tags-list">
          <li>tool</li>
        </ul>
      </div>
    );
  }
}

export default AppSideBarTags;

