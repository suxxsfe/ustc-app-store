import React, { Component } from "react";

import HeaderDetailList from "./HeaderDetailList.js";
import HeaderActions from "./HeaderActions.js";

class AppHeader extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="app-header">
        <img src="https://himg.bdimg.com/sys/portraitn/item/public.1.f355b4ea.XQ0gvtdscacwVeJkfGxQWw" />
        <h1>App name</h1>
        <HeaderDetailList />
        <HeaderActions />
      </div>
    );
  }
}

export default AppHeader;

