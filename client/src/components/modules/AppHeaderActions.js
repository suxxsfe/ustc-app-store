import React, { Component } from "react";

class AppHeaderActions extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="header-actions">
        <a href="www.baidu.com">
          <button>Download</button>
        </a>
        <a href="www.baidu.com">
          <button>web</button>
        </a>
      </div>
    );
  }
}

export default AppHeaderActions;
