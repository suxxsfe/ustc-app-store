import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";

import PathParamsHOC from "./PathParamsHOC.js";
import Root from "./pages/Root.js";

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
      post("/api/whoami", {})
      .then((res) => {
        this.setState({
          whoami: res,
        });
      });
    }
  }
  
  deleteWhoami(){
    this.setState({
      whoami: {name: "", _id: 0},
    });
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
    deleteWhoami: PropTypes.func,
  }
  getChildContext(){
    return {
      setMessage: this.setMessage.bind(this),
      whoami: this.state.whoami,
      deleteWhoami: this.deleteWhoami.bind(this),
    }
  }
  
  render(){
    return (
      <>
        <MessageBlock show={this.state.showMessage}
                      type={this.state.messageType} content={this.state.messageContent}
        />
        <div className="app-container">
          <BrowserRouter>
          <NavBar _id={this.state.whoami._id}/>
            <Routes>
              <Route path="/" element={<Root />} >
                <Route path="/app/:appId/settings" element={<PathParamsHOC component={AppSettings} />} />
                <Route path="/app/:appId" element={<PathParamsHOC component={AppPage} />} />
                <Route path="/user/:userId" element={<PathParamsHOC component={Profile} />} />
                <Route path="/user/:userId/settings" element={<PathParamsHOC component={ProfileSettingsPage} />} />
                <Route path="/search/" element={<Search />} />
                <Route path="/new/" element={<NewProjectPage />} />
                <Route path="/signin/" element={<SignInPage />} />
                <Route path="/signup/" element={<SignUpPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;

