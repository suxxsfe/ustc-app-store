import React, { Component } from "react";

import SingleTag from "./SingleTag.js";

const TMP_TAGS = [
  {
    name: "tag_a",
  },
  {
    name: "tag_b",
  },
  {
    name: "tag_c",
  },
  {
    name: "tag_d",
  },
  {
    name: "tag long long long",
  },
];

class TagsSelection extends Component{
  constructor(props){
    super(props);
  }
  
  handleOnClick(event){
    const classes = event.currentTarget.classList;
    if(classes.contains("selected-tag")){
      classes.remove("selected-tag");
    }
    else{
      classes.add("selected-tag");
      if(!classes.contains("select-all-tag")){
        event.currentTarget.parentNode.children[0].classList.remove("selected-tag");
        return;
      }
      for(const bro of event.currentTarget.parentNode.children){
        if(bro != event.currentTarget){
          bro.classList.remove("selected-tag");
        }
      }
    }
  }

  render(){
    return (
      <div className="tags-selection">
        <h2 className="tags-title">Tags</h2>
        <div className="tags">
          <SingleTag tag_name="all" _classname="select-all-tag" _onclick={this.handleOnClick} />
          {
            TMP_TAGS.map((obj) => {
              return (
                <SingleTag tag_name={obj.name} _onclick={this.handleOnClick} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TagsSelection;

