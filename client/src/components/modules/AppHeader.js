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
        <img className="app-logo" src={this.props.logo} />
        <h1 className="app-name">{this.props.name}</h1>
        <AppHeaderActions _id={this.props._id} authors={this.props.authors} web={this.props.web}/>
        <AppHeaderDetail authors={this.props.authors} />
      </div>
    );
  }
}

export default AppHeader;

