import React, { Component } from "react";

import { get } from "../../utilities.js";

import "./SideBar.css";

class SideBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="sidebar-part">
        <span className="sidebar-part-title">{this.props.title}</span>
        <ul className="sidebar-part-list">
        {
          this.props.elements.map((ele) => {
            return (
              <li>{ele}</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

class AppSideBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      about_elements: [],
      links_elements: [],
      tags_elements: [],
    };
  }
  
  componentDidMount(){
	get("/api/appinfo", {_id: this.props.appId}).then((info) => {
	  this.setState({
		about_elements: [
          "创建时间: "+info.creatdate,
          "最后编辑: "+info.updatedate,
          "支持平台: "+info.platform,
		],
		links_elements: [
		  info.links.map((link) => {
		    return (
			  <>
		       <a href={link.url}>TODO: img</a>
			    <span>{link.webname}</span>
			  </>
			);
		  })
		],
		tags_elements: [
		  info.tags,
		],
	  });
	});
  }
     
  render(){
    return (
      <div className="app-sidebar">
        <SideBar title="About:" elements={this.state.about_elements} />
        <SideBar title="Links:" elements={this.state.links_elements} />
        <SideBar title="Tags:" elements={this.state.tags_elements} />
      </div>
    );
  }
}

class ProfileSideBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      about_elements: [],
      links_elements: [],
    };
  }
  
  componentDidMount(){
	get("/api/userinfo", {_id: this.props.userId}).then((info) => {
	  this.setState({
		about_elements: [
          "用户类型："+info.type,
          "注册时间："+info.regdate,
          "最后访问："+info.visdate,
		],
		links_elements: [
		  info.links.map((link) => {
		    return (
			  <>
			    <a href={link.url}>TODO: img</a>
			    <span>{link.name}</span>
			  </>
			);
		  })
		],
	  });
	});
  }
  
  render(){
    return (
      <div className="profile-sidebar">
        <SideBar title="About:" elements={this.state.about_elements} />
        <SideBar title="Links:" elements={this.state.links_elements} />
      </div>
    );
  }
}

export default SideBar;
export { AppSideBar, ProfileSideBar };

