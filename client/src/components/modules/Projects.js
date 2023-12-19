import React, { Component } from "react";

import ProjectsOverview from "./ProjectsOverview.js";
import SingleProject from "./SingleProject.js";

import { get } from "../../utilities.js";

class Projects extends Component{
  constructor(props){
    super(props);
  	this.state = {
      projects: [],
  	};
  }
	
  componentDidMount(){
   	get("/api/userprojects", {_id: this.props.userId}).then((pro) => {
      console.log(pro);
   	  this.setState({
   		  projects: pro,
   	  });
   	})
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
    return (
      <div className="projects">
        <h2 className="project-title">Projects</h2>
        <ProjectsOverview projects_num={this.state.projects ? this.state.projects.length : 0} />
        {
          this.state.projects && this.state.projects.map((obj) => {
            return (
              <SingleProject project={obj} />
            );
          })
        }
      </div>
    );
  }
}

export default Projects;

