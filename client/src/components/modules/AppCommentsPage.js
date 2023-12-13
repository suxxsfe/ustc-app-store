import React, { Component } from "react";

import CommentsOverview from "./CommentsOverview.js";
import CommentCard from "./CommentCard.js";
import { NewComment } from "./PostInput.js";
import CommentStars from "./CommentStars.js";

import { get } from "../../utilities.js";

class AppCommentsPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      newScore: 0,
	  score: 0,
	  comments: [],
    };
  }
  
  handleScore(newScore){
    console.log(newScore);
	  
    this.setState({
      newScore: newScore,
    });
  }
	
  componentDidMount(){
	get("/api/comments", {_id: this.props.appId}).then((comments) => {
    let score = comments.reduce((score, comment) => (score+comment.score), 0);
	  score = (score == 0) ? "no score" : (score/comments.length).toFixed(1);
	    
	  this.setState({
	    comments: comments,
	    score: score,
	  });
	});
  }
  
  render(){
    return (
      <div className="comments-page sub-page-main">
        <CommentsOverview score={this.state.score} comments_num={this.state.comments.length} />
		{
		  this.state.comments.map((comment) => {
  		    return (
			  <CommentCard _id={comment._id} score={comment.score}
						   author={comment.author} content={comment.content}
			  />
		    );
		  })
		}
        <div className="new-comment">
          <span className="new-comment-title">发表评论</span>
          <CommentStars score={this.state.newScore} handleScore={this.handleScore.bind(this)} />
          <NewComment app_id={this.props.appId} score={this.state.newScore} />
        </div>
      </div>
    );
  }
}

export default AppCommentsPage;

