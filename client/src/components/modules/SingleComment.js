import React, { Component } from "react";

class SingleComment extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="comment-card-commentbody">
        <div className="single-comment-information">
          {this.props.author_name+"  "+this.props.score}
        </div>
        <div className="single-comment-content">
          {this.props.content}
        </div>
        <div className="single-comment-actions">
          <span className="show-reply-button" onClick={this.props.handle_show_reply}>回复</span>
        </div>
      </div>
    );
  }
}

export default SingleComment;

