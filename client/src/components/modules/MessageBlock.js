import React, { Component, PropTypes } from "react";

class MessageBlock extends Component{
  constructor(props){
    super(props);
  }

  getColor(){
    return this.props.type === "success" ? "green" : "red";
  }
    
  render(){
    return (
      <div className="message-block" style={{backgroundColor:this.getColor(),display:this.props.show ? "block" : "none"}}>
        <span>{this.props.content}</span>
      </div>
    );
  }
}

export default MessageBlock;

