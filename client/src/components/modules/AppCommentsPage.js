import React, { Component } from "react";

import CommentsOverview from "./CommentsOverview.js";
import CommentCard from "./CommentCard.js";
import { NewComment } from "./PostInput.js";
import CommentStars from "./CommentStars.js";

class AppCommentsPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      score: 0,
    };
  }
  
  handleScore(newScore){
    console.log(newScore);
    this.setState({
      score: newScore,
    });
  }
  
  render(){
    return (
      <div className="comments-page sub-page-main">
        <CommentsOverview score="4.5" comments_num="100" />
        <CommentCard _id="1" score="3.5" 
            author_name="comment author" content="comment content"
        />
        <div className="new-comment">
          <span className="new-comment-title">发表评论</span>
          <CommentStars score={this.state.score} handleScore={this.handleScore.bind(this)} />
          <NewComment app_id={"123"} score={this.state.score} />
        </div>
      </div>
    );
  }
}

export default AppCommentsPage;

