import React, { Component } from "react";

import SignIn from "../modules/SignIn.js";

import "../modules/SignInUp.css";

class SignInPage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <SignIn />
    );
  }
}

export default SignInPage;

