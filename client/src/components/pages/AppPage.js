import React, { Component } from "react";

import AppHeader from "../modules/AppHeader.js";
import RollingPictures from "../modules/RollingPictures.js";
import AppTabs from "../modules/AppTabs.js";
import AppSideBar from "../modules/AppSideBar.js";
import AppHomePage from "../modules/AppHomePage.js";
import AppDownloadPage from "../modules/AppDownloadPage.js";
import AppCommentsPage from "../modules/AppCommentsPage.js";

import "./AppPage.css";
import "../modules/Header.css";

const TMP_PICTURES_URL = [
  "https://pic.imgdb.cn/item/64edf25b661c6c8e543d1f99.png",
  "https://pic.imgdb.cn/item/64ede707661c6c8e54364bee.png",
  'https://pic.imgdb.cn/item/64edf25b661c6c8e543d1f8b.png',
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
//    console.log(event.target.getAttribute("hashcode"));
  }
  
  componentDidMount(){
    this.setState({
      page: window.location.hash,
    });
    window.addEventListener("hashchange", this.onHashChange.bind(this), false);
  }
  
  render(){
    let subPage = null;
    if(this.state.page === SubPages.HomePage || this.state.page === ""){
      subPage = (<AppHomePage />);
    }
    else if(this.state.page === SubPages.DownloadPage){
      subPage = (<AppDownloadPage />);
    }
    else if(this.state.page === SubPages.CommentsPage){
      subPage = (<AppCommentsPage />);
    }
    
    return (
      <>
        <AppHeader />
        <RollingPictures pictures={TMP_PICTURES_URL} />
        <div className="sub-page">
          <AppTabs _onClick={this.changeHash} focus={this.state.page}/>
          {subPage}
          <AppSideBar />
        </div>
      </>
    );
  }
}

export default AppPage;

