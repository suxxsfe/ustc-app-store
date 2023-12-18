import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <Link to={"/app/"+this.props.project._id}>
            <span>{this.props.project.name}</span>
          </Link>
        </div>
        <div className="project-overview">
          {this.props.project.describe.substring(0, 150)}
        </div>
        <Link className="project-entry" to={"/app/"+this.props.project._id}>
          <span>进入>>></span>
        </Link>
        <div className="project-detail">
          <span>{"创建于: "+this.props.project.createdate}</span>
          <span>{"更新于: "+this.props.project.updatedate}</span>
        </div>
      </div>
    );
  }
}

export default SingleProject;

