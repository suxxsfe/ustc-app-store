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
  }
  
  render(){
		const about_elements = [
      "创建时间: "+this.props.createdate,
      "最后编辑: "+this.props.updatedate,
      "支持平台: "+this.props.platforms,
		];
		const links_elements = [
		  this.props.links.map((link) => {
		    return (
			  <>
		      <a href={link.url} target="_blank" rel="noopener noreferrer">{link.webname}</a>
			  </>
			);
		  })
		];
		const tags_elements = this.props.tags.map((tag) => tag.name);
    return (
      <div className="app-sidebar">
        <SideBar title="About:" elements={about_elements} />
        <SideBar title="Links:" elements={links_elements} />
        <SideBar title="Tags:" elements={tags_elements} />
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
  
  render(){
  	const about_elements = [
      "用户类型："+this.props.type,
      "注册时间："+this.props.regdate,
      "最后访问："+this.props.visdate,
  	];
  	const links_elements = [
  	  this.props.links.map((link) => {
  	    return (
  		  <>
  		    <a href={link.url} rel="noopener noreferrer">{link.webname}</a>
  		  </>
  		);
  	  })
  	];
    return (
      <div className="profile-sidebar">
        <SideBar title="About:" elements={about_elements} />
        <SideBar title="Links:" elements={links_elements} />
      </div>
    );
  }
}

export default SideBar;
export { AppSideBar, ProfileSideBar };

