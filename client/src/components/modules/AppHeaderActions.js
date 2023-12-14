import React, { Component } from "react";
import PropTypes from "prop-types";

class AppHeaderActions extends Component{
  constructor(props){
    super(props);
  }
  
  static contextTypes = {
    whoami: PropTypes.object,
  }
  
  render(){
    return (
      <div className="header-actions">
        <a href="www.baidu.com">
          <button>web</button>
        </a>
        {
          this.props.authors.filter((author) => (author._id == this.context.whoami._id)).length !== 0 ?
          (
            <a href={"/app/"+this.props._id+"/settings"}>
              <button>管理</button>
            </a>
          ) :
          null
        }
      </div>
    );
  }
}

export default AppHeaderActions;

