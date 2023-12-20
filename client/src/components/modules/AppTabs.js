import React, { Component } from "react";
import { Link } from "react-router-dom";

class AppTabs extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="app-tabs">
        <ul className="app-tabs-list">
          <li onClick={this.props._onClick} hashcode="#HomePage"
              className={(this.props.focus === "#HomePage" || this.props.focus === "") ? "focus-tab" : ""}>主页</li>
          <li onClick={this.props._onClick} hashcode="#DownloadPage"
              className={this.props.focus === "#DownloadPage" ? "focus-tab" : ""}>下载</li>
          <li onClick={this.props._onClick} hashcode="#CommentsPage"
              className={this.props.focus === "#CommentsPage" ? "focus-tab" : ""}>评论</li>
        </ul>
      </div>
    );
  }
}

export default AppTabs;

