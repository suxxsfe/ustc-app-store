import React, { Component } from "react";

import "./Footer.css";

class Footer extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="footer">
        <span className="footer-text">
          ustc app store
        </span>
      </div>
    );
  }
}

export default Footer;

