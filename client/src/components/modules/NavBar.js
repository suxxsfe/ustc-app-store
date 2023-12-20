import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";

import "./NavBar.css";

class NavBar extends Component{
  constructor(props){
    super(props);
  }
  
  handleLogout(){
    window.localStorage.removeItem("token");
    window.location.reload();
  }

  render(){
    return (
      <nav className="navbar">
        <div className="navbar-title">
          <Link className="navbar-title-link" to="/">ustc-app-store</Link>
        </div>
        <div className="navbar-links-container">
          <Link className="navbar-link" to="/">Home</Link>
          <Link className="navbar-link" to={this.props._id ? "/user/"+this.props._id : "/signin"} state={{from: this.props.whereAmI}}>Profile</Link>
          <Link className="navbar-link" to="/search">Catalog</Link>
          <Link className="navbar-link" to="/new">New</Link>
          <Link className="navbar-link" to="/signin" state={{from: this.props.whereAmI}}>LogIn</Link>
          <Link className="navbar-link" to="/signup" state={{from: this.props.whereAmI}}>SignUp</Link>
          <p className="navbar-link" onClick={this.handleLogout.bind(this)}>Logout</p>
        </div>
      </nav>
    );
  }
}

export default NavBar;

