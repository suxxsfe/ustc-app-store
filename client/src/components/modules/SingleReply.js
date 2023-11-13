import React, { Component } from "react";

class SingleReply extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="comments-card-replybody">
        {this.props.author_name+": "+this.props.content}
      </div>
    );
  }
}

export default SingleReply;

