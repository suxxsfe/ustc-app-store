import React, { Component } from "react";

class CommentsOverview extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="comments-overview">
        <span>
          {this.props.score+" 分"}
        </span>
        <span>
          {this.props.comments_num+" 个评分"}
        </span>
      </div>
    );
  }
}

export default CommentsOverview;

