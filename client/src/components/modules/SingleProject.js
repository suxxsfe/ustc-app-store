import React, { Component } from "react";

class SingleProject extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="project">
        <img src={this.props.project.img_url} />
        <div className="project-title">
          <a href="www.baidu.com">
            <span>{this.props.project.name}</span>
          </a>
        </div>
        <div className="project-overview">
          <span>{this.props.project.intro}</span>
          <a className="project-entry" href="www.baidu.com">
            <span>进入>></span>
          </a>
        </div>
        <div className="project-detail">
          <span>{"创建于: "+this.props.project.create_time}</span>
          <span>{"更新于: "+this.props.project.update_time}</span>
        </div>
      </div>
    );
  }
}

export default SingleProject;

