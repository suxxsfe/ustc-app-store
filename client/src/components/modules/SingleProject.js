import React, { Component } from "react";

import { get } from "../../utilities.js";

class SingleProject extends Component{
  constructor(props){
    super(props);
  	this.state = {
  	  name: "",
  	  intro: "",
  	  updateDate: "",
  	  creatDate: "",
      imgUrl: "",
      appId: "",
  	};
  }
	
  componentDidMount(){
  	get("/api/appinfo", {_id: this.props.projectId}).then((info) => {
  	  this.setState({
    		name: info.name,
    		intro: "todo: intro",
    		updateDate: info.updatedate,
    		creatDate: info.creatdate,
        imgUrl:info.img_url,
        appId: info._id,
  	  });
  	});
  }

  render(){
    return (
      <div className="project">      
        <img className="project-logo" src={"/upload/applogo/"+this.state.appId} />
        <div className="project-title">
          <a href="www.baidu.com">
            <span>{this.state.name}</span>
          </a>
        </div>
        <div className="project-overview">
          <span>{this.state.intro}</span>
          <a className="project-entry" href="www.baidu.com">
            <span>进入</span>
          </a>
        </div>
        <div className="project-detail">
          <span>{"创建于: "+this.state.creatDate}</span>
          <span>{"更新于: "+this.state.updateDate}</span>
        </div>
      </div>
    );
  }
}

export default SingleProject;

