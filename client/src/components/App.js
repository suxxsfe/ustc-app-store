import React, { Component } from "react";
import { Router } from "@reach/router";
import PropTypes from "prop-types";

import AppPage from "./pages/AppPage.js";
import Profile from "./pages/Profile.js";
import Search from "./pages/Search.js";
import NewProjectPage from "./pages/NewProjectPage.js";
import SignInPage from "./pages/SignInPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import AppSettings from "./pages/AppSettings.js";
import ProfileSettingsPage from "./pages/ProfileSettingsPage.js";
import NotFound from "./pages/NotFound.js";

import MessageBlock from "./modules/MessageBlock.js";

import { post } from "../utilities.js";

import Footer from "./modules/Footer.js";
import NavBar from "./modules/NavBar.js";

import "../utilities.css";
import "./App.css";

class App extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      showMessage: false,
      messageType: "",
      messageContent: "",
      whoami: {},
    };
  }
  
  componentDidMount(){
    if(!window.localStorage.getItem("token")){
      this.setState({
        whoami: {name: "", _id: 0},
      });
    }
    else{
      post("/api/whoami", {Authorization: "Bearer"+localStorage.getItem("token"),})
      .then((res) => {
        this.setState({
          whoami: res,
        });
      });
    }
  }
  
  setMessage(type, content, time){
    this.setState({
      showMessage: true,
      messageType: type,
      messageContent: content,
    },() => {
      setTimeout(() => {
        this.setState({
          showMessage: false,
        });
      }, time);
    });
  }
  
  static childContextTypes = {
    setMessage: PropTypes.func,
    whoami: PropTypes.object,
  }
  getChildContext(){
    return {
      setMessage: this.setMessage.bind(this),
      whoami: this.state.whoami,
    }
  }
  
  render(){
    return (
      <>
        <MessageBlock show={this.state.showMessage}
                      type={this.state.messageType} content={this.state.messageContent}
        />
        <NavBar />
        <div className="app-container">
          <Router>
            <AppSettings path="/app/:appId/settings" />
            <AppPage path="/app/:appId" />
            <Profile path="/user/:userId" />
            <ProfileSettingsPage path="/user/:userId/settings" />
            <Search path="/search/" />
            <NewProjectPage path="/new/" />
            <SignInPage path="/signin/" />
            <SignUpPage path="/signup/" />
            <NotFound default />
          </Router>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;

