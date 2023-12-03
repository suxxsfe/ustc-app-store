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
  	get("/api/appdescribe", {_id: this.props.appId}).then((des) => {
  	  this.setState({
        //api.md是这么写的
  		describe: des.describe,
  	  });
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

