import React, { Component } from "react";

import AppHeader from "../modules/AppHeader.js";
import RollingPictures from "../modules/RollingPictures.js";
import AppTabs from "../modules/AppTabs.js";
import { AppSideBar } from "../modules/SideBar.js";
import AppHomePage from "../modules/AppHomePage.js";
import AppDownloadPage from "../modules/AppDownloadPage.js";
import AppCommentsPage from "../modules/AppCommentsPage.js";

import "./AppPage.css";
import "../modules/Header.css";

const TMP_PICTURES_URL = [
  "https://pic.downk.cc/item/5e7b1494504f4bcb04d6cda4.jpg",
	"https://pic.downk.cc/item/5e7cd9d5504f4bcb04e063ec.jpg",
	"https://pic.downk.cc/item/5e7b16a0504f4bcb04d8f5aa.jpg",
	"https://pic.downk.cc/item/5e7cd9d5504f4bcb04e063ce.jpg",
];

const SubPages = {
  HomePage: "#HomePage",
  DownloadPage: "#DownloadPage",
  CommentsPage: "#CommentsPage"
}
  
class AppPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      page: SubPages.HomePage,
    };
  }
  
  onHashChange(){
    this.setState({
      page: window.location.hash,
    });
  }
  changeHash(event){
    window.location.hash = event.target.getAttribute("hashcode");
  }
  
  componentDidMount(){
    this.setState({
      page: window.location.hash,
    });
    window.addEventListener("hashchange", this.onHashChange.bind(this), false);
  }
  
  render(){
    console.log(this.props.match);
    let subPage = null;
    if(this.state.page === SubPages.HomePage || this.state.page === ""){
      subPage = (<AppHomePage appId={this.props.appId} />);
    }
    else if(this.state.page === SubPages.DownloadPage){
      subPage = (<AppDownloadPage appId={this.props.appId} />);
    }
    else if(this.state.page === SubPages.CommentsPage){
      subPage = (<AppCommentsPage appId={this.props.appId} />);
    }
    
    return (
      <>
        <AppHeader appId={this.props.appId} />
        <RollingPictures pictures={TMP_PICTURES_URL} />
        <div className="sub-page">
          <AppTabs _onClick={this.changeHash} focus={this.state.page}/>
          {subPage}
          <AppSideBar appId={this.props.appId} />
        </div>
      </>
    );
  }
}

export default AppPage;

