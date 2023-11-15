import React, { Component } from "react";

class SearchBlock extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="search-block">
        <h1 className="search-block-title">搜索</h1>
        <div className="search-input-block">
          <input className="search-input" />
          <button className="search-go-button">搜索</button>
        </div>
      </div>
    );
  }
}

export default SearchBlock;

