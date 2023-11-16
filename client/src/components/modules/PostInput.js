import React, { Component } from "react";

import { post } from "../../utilities.js";

class NewPostInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: "",
    };
  }
  
  handleChange(event){
    this.setState({
      value: event.target.value,
    });
  }
  
  handleSubmit(event){
    event.preventDefault();
    if(this.props.on_submit){
      this.props.on_submit(this.state.value);
    }
    this.setState({
      value: "",
    });
  }

  render(){
    return (
      <div className="new-post-input">
        <input type="text" placeholder={this.props.default_text}
               value={this.state.value} onChange={this.handleChange.bind(this)}
               className="new-post-input-input"
        />
        <button type="submit" value="Submit"
                onClick={this.handleSubmit.bind(this)} className="new-post-input-button"
        >
          {this.props.button_text}
        </button>
      </div>
    );
  }
}

class SearchPostInput extends Component{
  constructor(props){
    super(props);
  }
  
  goSearch(value){
    post("", {content: value, tag: this.props.selected_tag, platform: this.props.selected_platform});
  }
  
  render(){
    return (
      <NewPostInput default_text="search" button_text="搜索"
                    on_submit={this.goSearch.bind(this)} className="assbafd"
      />
    );
  }
}

export default NewPostInput;
export { SearchPostInput };

