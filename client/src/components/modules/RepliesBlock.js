import React, { Component } from "react";

import SingleReply from "./SingleReply.js";

import { get } from "../../utilities.js";

class RepliesBlock extends Component{
  constructor(props){
    super(props);
	this.state = {
		replies: [],
	}
  }
	
  componentDidMount(){
	let replies = get("/api/replies", {_id: this.props.commentId});
	  
	this.setState({
	  replies: replies,
	});
  }

  render(){
    return (
      <div className="comment-card-replies-block">
        {
          this.state.replies.map((obj) => {
            return (
              <SingleReply 
                author={obj.author} content={obj.content} />
            );
          })
        }
      </div>
    );
  }
}

export default RepliesBlock;

