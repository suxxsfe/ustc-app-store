import React, { Component } from "react";

import SearchBlock from "../modules/SearchBlock.js";
import Projects from "../modules/Projects.js";

import "./Search.css";

class Search extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <>
        <SearchBlock />
        <Projects userId={123}/>
      </>
    );
  }
}

export default Search;

