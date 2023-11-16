import React, { Component } from "react";

import "./SideBar.css";

class SideBar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="sidebar-part">
        <span className="sidebar-part-title">{this.props.title}</span>
        <ul className="sidebar-part-list">
        {
          this.props.elements.map((ele) => {
            return (
              <li>{ele}</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

class AppSideBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      about_elements: [],
      links_elements: [],
      tags_elements: [],
    };
  }
  
  componentDidMount(){
    this.setState({
      about_elements: [
        "创建时间: 1111111",
        "最后编辑: 2222222",
        "支持平台: Windows Web",
      ],
    });
    this.setState({
      links_elements: [
        (
          <>
            <a href="www.bilibili.com">TODO: img</a>
            <span>bilibili</span>
          </>
        ),
      ],
    });
    this.setState({
      tags_elements: [
        "tool",
      ],
    });
  }
  
  render(){
    return (
      <div className="app-sidebar">
        <SideBar title="About:" elements={this.state.about_elements} />
        <SideBar title="Links:" elements={this.state.links_elements} />
        <SideBar title="Tags:" elements={this.state.tags_elements} />
      </div>
    );
  }
}

export default SideBar;
export { AppSideBar };

