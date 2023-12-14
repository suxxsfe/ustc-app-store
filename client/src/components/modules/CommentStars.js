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
        <svg width="0" height="0">
          <symbol viewBox="0 0 40 40" id="star">
            <path d="m0,11.47032l11.41055,0l3.52595,-11.47032l3.52595,11.47032l11.41055,0l-9.23131,7.08896l3.52613,11.47032l-9.23131,-7.08916l-9.23131,7.08916l3.52613,-11.47032l-9.23131,-7.08896z"/>
          </symbol>
        </svg>
        <div className={"single-star "+(this.props.score >= 5 ? "focus-star" : "unfocus-star")}
             onClick={this.handleScore.bind(this,5)}
        >
          <svg>
            <use href="#star"></use>
          </svg>
        </div>
        <div className={"single-star "+(this.props.score >= 4 ? "focus-star" : "unfocus-star")}
             onClick={this.handleScore.bind(this,4)}
        >
          <svg>
            <use href="#star"></use>
          </svg>
        </div>
        <div className={"single-star "+(this.props.score >= 3 ? "focus-star" : "unfocus-star")}
             onClick={this.handleScore.bind(this,3)}
        >
          <svg>
            <use href="#star"></use>
          </svg>
        </div>
        <div className={"single-star "+(this.props.score >= 2 ? "focus-star" : "unfocus-star")}
             onClick={this.handleScore.bind(this,2)}
        >
          <svg>
            <use href="#star"></use>
          </svg>
        </div>
        <div className={"single-star "+(this.props.score >= 1 ? "focus-star" : "unfocus-star")}
             onClick={this.handleScore.bind(this,1)}
        >
          <svg>
            <use href="#star"></use>
          </svg>
        </div>
      </div>
    );
  }
}

export default CommentStars;

