import React, { Component } from "react";

import SearchBlock from "../modules/SearchBlock.js";
import Projects from "../modules/Projects.js";
import SingleProject from "../modules/SingleProject.js";

import "./Search.css";

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      projects: undefined,
    };
  }
  
  giveResult(value){
    this.setState({
      projects: value,
    });
  }

  render(){
    return (
      <>
        <SearchBlock giveResult={this.giveResult.bind(this)}/>
        <div className="projects">
          <h2 className="project-title">Projects</h2>
          {
            this.state.projects ? (
              <>
                <p>{"共 "+this.state.projects.length+" 个结果"}</p>
                {
                  this.state.projects.map((obj) => {
                    return (
                      <SingleProject project={obj} />
                    );
                  }) 
                }
              </>
            ) :
            "正在搜索...."
          }
        </div>
      </>
    );
  }
}

export default Search;

