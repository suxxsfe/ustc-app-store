import React, { Component } from "react";

import SingleReply from "./SingleReply.js";

class RepliesBlock extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="comment-card-replies-block">
        {
          this.props.replies.map((obj) => {
            return (
              <SingleReply 
                author_name={obj.author_name} content={obj.content} />
            );
          })
        }
      </div>
    );
  }
}

export default RepliesBlock;

