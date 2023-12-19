import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import SignUp from "../modules/SignUp.js";

import "../modules/SignInUp.css";

class SignUpPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      signed: false,
    }
  }
  
  static contextTypes = {
    deleteWhoami: PropTypes.func,
  }
  
  handleSigned(){
    console.log("signed");
    window.localStorage.removeItem("token");
    this.context.deleteWhoami();
    this.setState({
      signed: true,
    });
  }

  render(){
    return this.state.signed ?
      <Navigate to="/signin" state={{
        from: "/signup",
        message: {type: "success", content: "注册成功"}
      }} /> :
      <SignUp successSignUpHook={this.handleSigned.bind(this)}/>
  }
}

export default SignUpPage;

