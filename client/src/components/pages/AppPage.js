import React, { Component } from "react";

import AppHeader from "../modules/AppHeader.js";
import AppTabs from "../modules/AppTabs.js";
import AppSideBar from "../modules/AppSideBar.js";
import AppHomePage from "../modules/AppHomePage.js";
import AppDownloadPage from "../modules/AppDownloadPage.js";
import AppCommentsPage from "../modules/AppCommentsPage.js";

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
    window.location.hash = "#"+event.target.getAttribute("hashcode");
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
        <AppTabs _onClick={this.changeHash}/>
        {subPage}
        <AppSideBar />
      </>
    );
  }
}

export default AppPage;

