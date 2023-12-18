import React, { Component } from "react";

import { get } from "../../utilities.js";

class SingleProject extends Component{
  constructor(props){
    super(props);
  }
	
  render(){
    return (
      <div className="project">      
        <img className="project-logo" src={"/upload/applogo/"+this.props.project._id} />
        <div className="project-title">
          <a href="www.baidu.com">
            <span>{this.props.project.name}</span>
          </a>
        </div>
        <div className="project-overview">
          <span>{this.props.project.describe.substring(0, 150)}</span>
          <a className="project-entry" href="www.baidu.com">
            <span>进入>>></span>
          </a>
        </div>
        <div className="project-detail">
          <span>{"创建于: "+this.props.project.createdate}</span>
          <span>{"更新于: "+this.props.project.updatedate}</span>
        </div>
      </div>
    );
  }
}

export default SingleProject;

