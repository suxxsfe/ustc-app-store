import React, { Component } from "react";

import SingleComment from "./SingleComment.js";
import RepliesBlock from "./RepliesBlock.js";
import { NewReply } from "./PostInput.js";

class CommentCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      showNewReply: false,
    };
  }
  
  handleShowReply(){
    this.setState((preState) => ({
      showNewReply: !preState.showNewReply,
    }));
  }
  
  render(){
    return (
      <div className="comment-card">
        <SingleComment _id={this.props._id} score={this.props.score}
                       author={this.props.author} content={this.props.content} 
                       handle_show_reply={this.handleShowReply.bind(this)}
        />
        <RepliesBlock commentId={this.props._id}/>
        <div className="new-reply" style={{display:this.state.showNewReply ? "block" : "none"}}>
          <NewReply commentId={this.props._id} />
        </div>
      </div>
    );
  }
}

export default CommentCard;

