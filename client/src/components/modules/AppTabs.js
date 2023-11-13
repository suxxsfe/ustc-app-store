import React, { Component } from "react";

class AppTabs extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="app-tabs">
        <ul className="app-tabs-list">
          <li onClick={this.props._onClick} hashcode="HomePage">主页</li>
          <li onClick={this.props._onClick} hashcode="DownloadPage">下载</li>
          <li onClick={this.props._onClick} hashcode="CommentsPage">评论</li>
          <li onClick={this.props._onClick}>编辑</li>
        </ul>
      </div>
    );
  }
}

export default AppTabs;

