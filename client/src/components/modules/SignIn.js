

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
    let encryptor = new JSEncrypt();  //实例化
    encryptor.setPublicKey("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6FHVFrbCMA+/E64qYMqc7SpY2XRKjVmYPNGV9EFG59m0Ncy+FP8B+xRL2uYSwEGxQV9oct8ae+ogoRmrZEXQq3SbSQpj5ePslneIEKTEyCwx6ReT6wOd/BfwIFaarewi6jKK6IVzN16kiPpOlqjXOPiyMjXJWfpxImEiF/7DYcFGBabPthy5WwXq5wDySqthjg8/6xmPkvJweZ3lSZK2bZ02uVf7c+ZyfNcPgQCUYwflnYchche0M+zdDG2rGE1D4LwaFDP2tt5gG/58EivYQNSnVecSFGQ9gDrpOvmbkB3akNpJ8s5tnPVvNN4Ug4r/JFCTdH2b54zBrnpvpByyiwIDAQAB"
    ); //设置公钥
    let  newpass=encryptor.encrypt(this.state.password);
    console.log(newpass);
    post("/api/login", {
      name: this.state.username,
      password: newpass,
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
                  <a href="/signup">sign up</a>
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

