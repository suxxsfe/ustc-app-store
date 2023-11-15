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

  render(){
    return (
      <div className="tags-selection">
        <h2 className="tags-title">Tags</h2>
        <div className="tags">
          {
            TMP_TAGS.map((obj) => {
              return (
                <SingleTag tag_name={obj.name} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TagsSelection;

