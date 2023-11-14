import React, { Component } from "react";

import AppHeaderDetail from "./AppHeaderDetail.js";
import AppHeaderActions from "./AppHeaderActions.js";

class AppHeader extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="app-header">
        <img className="app-logo" src="https://himg.bdimg.com/sys/portraitn/item/public.1.f355b4ea.XQ0gvtdscacwVeJkfGxQWw" />
        <h1 className="app-name">App name</h1>
        <AppHeaderActions />
        <AppHeaderDetail />
      </div>
    );
  }
}

export default AppHeader;

