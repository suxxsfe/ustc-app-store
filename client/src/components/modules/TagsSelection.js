import React, { Component } from "react";

import SingleTag from "./SingleTag.js";

class TagsSelection extends Component{
  constructor(props){
    super(props);
  }
  
  handleOnClick(event){
    this.props.handle_selection(event.target.innerHTML);
  }
  
  isSelected(name){
    return this.props.selected_tag === name;
  }

  render(){
    return (
      <div className="tags-selection">
        <h2 className="tags-title">{this.props.tags_title}</h2>
        <div className="tags">
          <SingleTag tag_name="all" is_selected={this.isSelected("all")}
                     _onclick={this.handleOnClick.bind(this)}
          />
          {
            this.props.tags_name.map((obj) => {
              return (
                <SingleTag tag_name={obj.name} is_selected={this.isSelected(obj.name)}
                           _onclick={this.handleOnClick.bind(this)}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TagsSelection;

