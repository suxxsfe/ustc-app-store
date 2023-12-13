import React, { Component } from "react";

class SingleReply extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="comments-card-replybody">
        <a className="reply-authorname" href={"/user/"+this.props.author._id} >
          {this.props.author.name}
        </a>
        <span>{": "+this.props.content}</span>
      </div>
    );
  }
}

export default SingleReply;

