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
        <div className="footer-info">
          <div className="footer-content">
            <a href="https://github.com/suxxsfe/ustc-app-store">code</a>
          </div>
          <div className="footer-content">
            <a href="https://github.com/suxxsfe/ustc-app-store/issues">issue</a>
          </div>
          <div className="footer-content">
            <a href="https://github.com/Math-rad-round">author</a>
          </div>
          <div className="footer-content">
            <a href="https://github.com/suxxsfe">author</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;

