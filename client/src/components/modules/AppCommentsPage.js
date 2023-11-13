import React, { Component } from "react";

import CommentsOverview from "./CommentsOverview.js";
import CommentCard from "./CommentCard.js";

class AppCommentsPage extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="comments-page-container">
        <CommentsOverview score="4.5" comments_num="100" />
        <CommentCard _id="1" score="3.5" 
            author_name="comment author" content="comment content" />
      </div>
    );
  }
}

export default AppCommentsPage;

