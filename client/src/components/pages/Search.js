import React, { Component } from "react";

import SearchBlock from "../modules/SearchBlock.js";
import TagsSelection from "../modules/TagsSelection.js";
import Projects from "../modules/Projects.js";

class Search extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <>
        <SearchBlock />
        <TagsSelection />
        <Projects />
      </>
    );
  }
}

export default Search;

