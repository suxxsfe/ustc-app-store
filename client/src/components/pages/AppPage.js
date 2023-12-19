import React, { Component } from "react";

import AppHeader from "../modules/AppHeader.js";
//import RollingPictures from "../modules/RollingPictures.js";
import VideoPlayer from "../modules/VideoPlayer.js";
import AppTabs from "../modules/AppTabs.js";
import { AppSideBar } from "../modules/SideBar.js";
import AppHomePage from "../modules/AppHomePage.js";
import AppDownloadPage from "../modules/AppDownloadPage.js";
import AppCommentsPage from "../modules/AppCommentsPage.js";

import NotFound from "../pages/NotFound.js";

import { get } from "../../utilities.js";

import "./AppPage.css";
import "../modules/Header.css";

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
      video: "",
      logo: "",
      authors: [],
      name: "",
      describe: "",
      downloads: [],
      createdate: "",
      updatedate: "",
      platforms: [],
      links: [],
      tags: [],
      web: "",
      notFound: false,
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
    
    get("/api/appinfo", {_id: this.props.appId})
    .then((app) => {
      this.setState(app);
    })
    .catch((error) => {
      if(error.indexOf("404") != -1){
        this.setState({
          notFound: true,
        });
      }
      else{
        console.log(error);
      }
    });
  }
  
  render(){
    if(this.state.notFound){
      return <NotFound />
    }
    
    let subPage = null;
    if(this.state.page === SubPages.HomePage || this.state.page === ""){
      subPage = (<AppHomePage describe={this.state.describe} />);
    }
    else if(this.state.page === SubPages.DownloadPage){
      subPage = (<AppDownloadPage downloadList={this.state.downloads} />);
    }
    else if(this.state.page === SubPages.CommentsPage){
      subPage = (<AppCommentsPage appId={this.props.appId} />);
    }
    
    return (
      <>
        <AppHeader _id={this.props.appId} name={this.state.name}
                   logo={"/upload/applogo/"+this.props.appId} authors={this.state.authors}
                   web={this.state.web}
        />
        <VideoPlayer videoSrc={"/"+this.state.video}/>
        <div className="sub-page">
          <AppTabs _onClick={this.changeHash} focus={this.state.page} appId={this.props.appId}/>
          {subPage}
          <AppSideBar links={this.state.links} createdate={this.state.createdate}
                      updatedate={this.state.updatedate} platforms={this.state.platforms}
                      tags={this.state.tags}
          />
        </div>
      </>
    );
  }
}

export default AppPage;

