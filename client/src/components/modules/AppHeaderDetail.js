import React, { Component } from "react";

class AppHeaderDetail extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="app-header-detail">
        By 
        <a href="www.baidu.com">author name</a>
      </div>
    )
  }
}

export default AppHeaderDetail;

