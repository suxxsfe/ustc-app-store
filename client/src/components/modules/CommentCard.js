import React, { Component } from "react";

import SingleComment from "./SingleComment.js";
import RepliesBlock from "./RepliesBlock.js";
import { NewReply } from "./PostInput.js";

const TMP_COMMENTS = [
  {
    _id: "1",
    author_name: "replyer",
    content: "reply content",
  },
  {
    _id: "2",
    author_name: "replyer2",
    content: "reply content 2222222",
  },
];

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
                       author_name={this.props.author_name} content={this.props.content} 
                       handle_show_reply={this.handleShowReply.bind(this)}
        />
        <RepliesBlock CommentId={this.props._id} replies={TMP_COMMENTS} />
        <div className="new-reply" style={{display:this.state.showNewReply ? "block" : "none"}}>
            <NewReply app_id={"this_app"} />
        </div>
      </div>
    );
  }
}

export default CommentCard;

