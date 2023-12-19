import React, { Component, PropTypes } from "react";

class MessageBlock extends Component{
  constructor(props){
    super(props);
  }

  getColor(){
//    return "#FFFFFF";
    return this.props.type === "success" ? "#32CD32" : "#DC143C";
  }
    
  render(){
    return (
      <div className="message-block" style={{
        backgroundColor: this.getColor(),
        opacity: this.props.show ? "1" : "0",
        top: this.props.show ? "70px" : "-40px",
      }}>
        <span>{this.props.content}</span>
      </div>
    );
  }
}

export default MessageBlock;

