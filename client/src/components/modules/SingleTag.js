import React, { Component } from "react";

class SingleTag extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className={(this.props.is_selected ? "selected-tag" : "") +" tag"}>
        <span onClick={this.props._onclick}>{this.props.tag_name}</span>
      </div>
    );
  }
}

export default SingleTag;

