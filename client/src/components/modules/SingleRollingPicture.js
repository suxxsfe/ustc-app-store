import React, { Component } from "react";

class SingleRollingPicture extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="single-rolling-picture">
        <img src={this.props.url} />
      </div>
    );
  }
}

export default SingleRollingPicture;

