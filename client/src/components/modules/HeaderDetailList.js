import React, { Component } from "react";

class HeaderDetailList extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <ul className="header-detail-list">
        <li>
          "By"
          <a href="www.baidu.com">author name</a>
        </li>
      </ul>
    )
  }
}

export default HeaderDetailList;

