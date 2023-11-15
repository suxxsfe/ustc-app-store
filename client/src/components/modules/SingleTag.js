import React, { Component } from "react";

class SingleTag extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="tag">
        <span>{this.props.tag_name}</span>
      </div>
    );
  }
}

export default SingleTag;

