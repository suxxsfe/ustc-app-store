import React, { Component } from "react";
import { createBrowserHistory } from "history";
import PropTypes from "prop-types";

import SignIn from "../modules/SignIn.js";

import "../modules/SignInUp.css";

class SignInPage extends Component{
  constructor(props){
    super(props);
  }
  
  static contextTypes = {
    whoami: PropTypes.object,
  }
  
  componentDidMount(){
    if(this.context.whoami._id){
      this.handleSigned();
    }
  }
  
  handleSigned(){
    let history = createBrowserHistory();
//    history.push({pathname: "/", state: {from: "adfsf"}});
    const st = history.location.state;
    if(st && st.from){
      history.push({pathname: st.from == "/signup" ? "/" : st.from});
      history.go();
    }
    else{
      history.go(-1);
    }
  }

  render(){
    return (
      <SignIn successSignInHook={this.handleSigned.bind(this)} />
    );
  }
}

export default SignInPage;

