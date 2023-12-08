import React, { Component } from "react";

import AppHeaderDetail from "./AppHeaderDetail.js";
import AppHeaderActions from "./AppHeaderActions.js";

import { get } from "../../utilities.js";

class AppHeader extends Component{
  constructor(props){
    super(props);
  	this.state = {
      appName: "",
	    authors: [],
	  };
  }
	
  componentDidMount(){
  	get("/api/appinfo", {_id: this.props.appId}).then((info) => {
      this.setState({
        appName: info.name,
        authors: info.authors,
      });
  	});
  }
  
  render(){
    return (
      <div className="app-header">
        <img className="app-logo" src="https://himg.bdimg.com/sys/portraitn/item/public.1.f355b4ea.XQ0gvtdscacwVeJkfGxQWw" />
        <h1 className="app-name">{this.state.appName}</h1>
        <AppHeaderActions />
        <AppHeaderDetail authors={this.state.authors} />
      </div>
    );
  }
}

export default AppHeader;

