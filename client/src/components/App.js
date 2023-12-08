import React, { Component } from "react";
import { Router } from "@reach/router";

import AppPage from "./pages/AppPage.js";
import Profile from "./pages/Profile.js";
import Search from "./pages/Search.js";
import NewProjectPage from "./pages/NewProjectPage.js";
import SignInPage from "./pages/SignInPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import NotFound from "./pages/NotFound.js";

import Footer from "./modules/Footer.js";
import NavBar from "./modules/NavBar.js";

import "../utilities.css";
import "./App.css";

class App extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <>
        <NavBar />
        <div className="app-container">
          <Router>
            <AppPage path="/app/:appId" />
            <Profile path="/user/:userId" />
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

