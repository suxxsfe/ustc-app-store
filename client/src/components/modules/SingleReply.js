import React, { Component } from "react";
import { Link } from "react-router-dom";

class SingleReply extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="comments-card-replybody">
        <Link className="reply-authorname" to={"/user/"+this.props.author._id} >
          {this.props.author.name}
        </Link>
        <span>{": "+this.props.content}</span>
      </div>
    );
  }
}

export default SingleReply;

