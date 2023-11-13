import React, { Component } from "react";

class AppHomePage extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="home-page">
        <h2>
          Home Page Title
        </h2>
        <p>
          Home Page
        </p>
      </div>
    );
  }
}

export default AppHomePage;

