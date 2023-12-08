import React, { Component } from "react";

import SignIn from "./SignIn.js";

class PopUpSignIn extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="pop-up-sign-in" style={{display: this.props.showPopUpSignIn ? "" : "none"}}>
        <SignIn />
        <button className="pop-up-sign-in-close" onClick={this.props.handleClosePopUp}>X</button>
      </div>
    );
  }
}

export default PopUpSignIn;

