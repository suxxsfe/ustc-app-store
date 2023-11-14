import React, { Component } from "react";

class ArrowButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <button className={"arrow-button "+this.props.direction+"-arrow-button"} onClick={this.props._onclick}>{this.props.direction}</button>
    );
  }
}

export default ArrowButton;

