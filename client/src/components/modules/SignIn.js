import * as CryptoJS from "crypto-js";

import { Link } from "react-router-dom";
import React, { Component } from "react";
import { createBrowserHistory } from "history";
import PropTypes from "prop-types";

import { post } from "../../utilities.js";
import { Consumer } from "../pages/Root.js";
import { JSEncrypt } from 'jsencrypt'

class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  
  handleUsernameChange(event){
    this.setState({
      username: event.target.value,
    });
  }
  handlePasswordChange(event){
    this.setState({
      password: event.target.value,
    });
  }
  
  goSignIn(){
    post("/api/login", {
      name: this.state.username,
      password: CryptoJS.MD5(this.state.password).toString(),
    })
    .then((res) => {
      console.log(res);
      window.localStorage.setItem("token", res.token);
      this.props.successSignInHook();
    })
    .catch((error) => {
      console.log(error);
      this.showMessage("fail", "用户名或密码错误", 1000);
    });
  }

  render(){
    return (
      <Consumer>
        {(value) => {
          this.showMessage = value;
          return (
            <>
              <div className="sign-container">
                <label for="username" className="sign-in-label">Username</label>
                <input type="text" name="username" placeholder="your username"
                       onChange={this.handleUsernameChange.bind(this)} value={this.state.username}
                       className="sign-in-input"
                />
                <label for="password">Password</label>
                <input type="password" name="password"
                       onChange={this.handlePasswordChange.bind(this)} value={this.state.password}
                       className="sign-in-input"
                />
                <button type="submit" value="Submit"
                        className="new-post-input-button sign-in-button"
                        onClick={this.goSignIn.bind(this)}
                >
                  Sign in
                </button>
                <div className="go-sign-up">
                  <Link to="/signup">sign up</Link>
                </div>
              </div>
            </>
          );
        }}
      </Consumer>
    );
  }
}

export default SignIn;

