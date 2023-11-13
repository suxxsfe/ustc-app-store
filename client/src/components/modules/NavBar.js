import React, { Component } from "react";
import { Link } from "@reach/router";

class NavBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav className="navbar">
        <div className="navbar-title u-inlineblock">ustc-app-store</div>
        <div className="navbar-links-container u-inlineblock">
          <Link className="navbar-link" to="/">Home</Link>
          <Link className="navbar-link" to="/app">App</Link>
          <Link className="navbar-link" to="/profile">Profile</Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;

