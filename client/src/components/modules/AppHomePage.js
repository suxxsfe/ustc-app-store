import React, { Component } from "react";

import { get } from "../../utilities.js";

class AppHomePage extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="home-page sub-page-main">
        <p>
          {this.props.describe}
        </p>
      </div>
    );
  }
}

export default AppHomePage;

