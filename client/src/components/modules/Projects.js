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
	  this.setState({
        //api.md是这么写的
		projects: pro.projects,
	  });
	});
  }

  render(){
    return (
      <div className="projects">
        <h2 className="project-title">Projects</h2>
        <ProjectsOverview projects_num={this.state.projects.length} />
        {
          this.state.projects.map((obj) => {
            return (
              <SingleProject projectId={obj} />
            );
          })
        }
      </div>
    );
  }
}

export default Projects;

