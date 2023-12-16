import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

class NavBar extends Component{
  constructor(props){
    super(props);
  }
  
  handleLogout(){
    window.localStorage.removeItem("token");
  }

  render(){
    return (
      <nav className="navbar">
        <div className="navbar-title">
          <Link className="navbar-title-link" to="/">ustc-app-store</Link>
        </div>
        <div className="navbar-links-container">
          <Link className="navbar-link" to="/">Home</Link>
          <Link className="navbar-link" to={this.props._id ? "/user/"+this.props._id : "/signin"}>Profile</Link>
          <Link className="navbar-link" to="/search">Catalog</Link>
          <Link className="navbar-link" to="/signin">LogIn</Link>
          <p className="navbar-link" onClick={this.handleLogout.bind(this)}>Logout</p>
        </div>
      </nav>
    );
  }
}

export default NavBar;

