import React, { Component } from "react";

import ProjectsOverview from "./ProjectsOverview.js";
import SingleProject from "./SingleProject.js";

const TMP_PROJECTS = [
  {
    name: "project_1_name",
    img_url: "https://himg.bdimg.com/sys/portraitn/item/public.1.f355b4ea.XQ0gvtdscacwVeJkfGxQWw",
    intro: "project_1_intro 111111111111111111111111111111111111111",
    create_time: "11111",
    update_time: "22222",
  },
  {
    name: "project_2_name",
    img_url: "https://himg.bdimg.com/sys/portraitn/item/public.1.f355b4ea.XQ0gvtdscacwVeJkfGxQWw",
    intro: "project_2_intro 1231231231233231231231231231231323",
    create_time: "33333",
    update_time: "44444",
  },
];

class Projects extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="projects">
        <h2 className="project-title">Projects</h2>
        <ProjectsOverview projects_num={TMP_PROJECTS.length} />
        {
          TMP_PROJECTS.map((obj) => {
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

