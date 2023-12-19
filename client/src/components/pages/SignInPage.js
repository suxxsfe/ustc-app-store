import React, { Component } from "react";
import { createBrowserHistory } from "history";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import SignIn from "../modules/SignIn.js";

import "../modules/SignInUp.css";

class SignInPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      signed: 0,//0-unsigned 1-already signed 2-signed
    };
  }
  
  static contextTypes = {
    whoami: PropTypes.object,
  }
  
  componentDidMount(){
    if(this.context.whoami._id){
      this.setState({
        signed: 1,
      });
    }
  }
  
  handleSigned(){
    this.setState({
      signed: 2,
    });
  }

  render(){
    if(this.state.signed == 2){
      window.reload();
    }
    if(this.state.signed != 0){
      const history = createBrowserHistory();
      const st = history.location.state;
      let whereToGo = "/";
      if(st && st.from && st.from != "/signup"){
        whereToGo = st.from;
      }
      const message = {
        type: "success",
        content: this.state.signed == 1 ? "您已登陆" : "登陆成功",
      };
      return <Navigate to={whereToGo} state={{from: "/signin", message: message}} />
    }
    else{
      return <SignIn successSignInHook={this.handleSigned.bind(this)} />;
    }
  }
}

export default SignInPage;

