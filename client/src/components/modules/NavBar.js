import React, { Component } from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

class NavBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav className="navbar">
        <div className="navbar-title">
          <Link className="navbar-title-link" to="/">ustc-app-store</Link>
        </div>
        <div className="navbar-links-container">
          <Link className="navbar-link" to="/">Home</Link>
          <Link className="navbar-link" to="/app">App</Link>
          <Link className="navbar-link" to="/user">Profile</Link>
          <Link className="navbar-link" to="/search">Catalog</Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;

