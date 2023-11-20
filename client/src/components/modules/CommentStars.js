import React, { Component } from "react";

import "./CommentStars.css";

class CommentStars extends Component{
  constructor(props){
    super(props);
  }
  
  handleScore(newScore, event){
    this.props.handleScore(newScore);
  }

  render(){
    return (
      <div className="comment-stars">
        <div className={"single-star "+(this.props.score >= 5 ? "focus-star" : "unfocus-star")}
             onClick={this.handleScore.bind(this,5)}
        >
        </div>
        <div className={"single-star "+(this.props.score >= 4 ? "focus-star" : "unfocus-star")}
             onClick={this.handleScore.bind(this,4)}
        >
        </div>
        <div className={"single-star "+(this.props.score >= 3 ? "focus-star" : "unfocus-star")}
             onClick={this.handleScore.bind(this,3)}
        >
        </div>
        <div className={"single-star "+(this.props.score >= 2 ? "focus-star" : "unfocus-star")}
             onClick={this.handleScore.bind(this,2)}
        >
        </div>
        <div className={"single-star "+(this.props.score >= 1 ? "focus-star" : "unfocus-star")}
             onClick={this.handleScore.bind(this,1)}
        >
        </div>
      </div>
    );
  }
}

export default CommentStars;

