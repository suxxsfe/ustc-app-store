import React, { Component } from "react";
import { Router } from "@reach/router";

import AppPage from "./pages/AppPage.js";

import Footer from "./modules/Footer.js";
import NavBar from "./modules/NavBar.js";

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
            <AppPage path="/app/" />
          </Router>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;

