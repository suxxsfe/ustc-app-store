import React, { Component } from "react";

import { get } from "../../utilities.js";

class AppHomePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      describe: "",
    };
  }
  
  componentDidMount(){
    this.setState({
      describe: get("/api/appdescribe"),
    });
  } 
  
  render(){
    return (
      <div className="home-page sub-page-main">
        <p>
          {this.state.describe}
        </p>
      </div>
    );
  }
}

export default AppHomePage;

