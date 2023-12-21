import React, { Component } from "react";
import { Link } from "react-router-dom";

class AppHeaderDetail extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="app-header-detail">
        <span>By&nbsp;</span>
		{
		  this.props.authors.map((author) => {
		    return (
			  <Link to={"/user/"+author._id}>{author.name}</Link>
			);
		  })
		}
      </div>
    )
  }
}

export default AppHeaderDetail;

