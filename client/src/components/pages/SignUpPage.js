import React, { Component } from "react";

import SignUp from "../modules/SignUp.js";

import "../modules/SignInUp.css";

class SignUpPage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <SignUp />
    );
  }
}

export default SignUpPage;

