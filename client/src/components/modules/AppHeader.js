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
        <img src="https://himg.bdimg.com/sys/portraitn/item/public.1.f355b4ea.XQ0gvtdscacwVeJkfGxQWw" />
        <h1>App name</h1>
        <AppHeaderDetail />
        <AppHeaderActions />
      </div>
    );
  }
}

export default AppHeader;

