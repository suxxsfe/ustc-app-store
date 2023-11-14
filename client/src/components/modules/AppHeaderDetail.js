import React, { Component } from "react";

class AppHeaderDetail extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <ul className="app-header-detail">
        <li>
          By
          <a href="www.baidu.com">author name</a>
        </li>
      </ul>
    )
  }
}

export default AppHeaderDetail;

