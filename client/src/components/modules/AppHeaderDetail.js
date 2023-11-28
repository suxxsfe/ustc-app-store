import React, { Component } from "react";

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
			  <a href="">{author.name}</a>
			);
		  })
		}
      </div>
    )
  }
}

export default AppHeaderDetail;

