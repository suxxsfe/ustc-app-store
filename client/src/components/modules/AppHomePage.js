import React, { Component } from "react";

import { marked } from "marked";
import * as DOMPurify from "dompurify";

import { get } from "../../utilities.js";

class AppHomePage extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="home-page sub-page-main">
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked.parse(this.props.describe))}} ></div>
      </div>
    );
  }
}

export default AppHomePage;

