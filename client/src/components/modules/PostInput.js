import React, { Component } from "react";
import PropTypes from "prop-types";

import { Consumer } from "../pages/Root.js";

import { get, post, getLoggedInfo } from "../../utilities.js";
import PopUpSignIn from "./PopUpSignIn.js";

import "./PostInput.css";

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
    let input_type = this.props.use_textarea !== undefined ?
          (<textarea type="text" placeholder={this.props.default_text}
                     value={this.state.value} onChange={this.handleChange.bind(this)}
                     className="new-post-input-input"
          />) :
          (<input type="text" placeholder={this.props.default_text}
                 value={this.state.value} onChange={this.handleChange.bind(this)}
                 className="new-post-input-input"
          />);
    return (
      <div className="new-post-input">
        {
          input_type
        }
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
    this.props.giveResult(undefined);
    get("/api/search", {content: value, tag: this.props.selected_tag, platform: this.props.selected_platform})
    .then((res) => {
      console.log("seach result: "+res.projects);
      this.props.giveResult(res.projects);
    });
  }
  
  componentDidMount(){
    this.goSearch("");
  }
  
  render(){
    return (
      <NewPostInput default_text="search" button_text="搜索"
                    on_submit={this.goSearch.bind(this)}
      />
    );
  }
}

class NewComment extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      popupSignIn: false,
    };
  }
  
  postNewComment(value){
    if(!getLoggedInfo()){
      this.showMessage("fail", "请先登陆", 1000);
      this.setState({
        popupSignIn: true,
      });
      return;
    }
    if(!value || value == ""){
      this.showMessage("fail", "评论内容不能为空", 1000);
      return;
    }
    if(!this.props.score || this.props.score == 0){
      this.showMessage("fail", "请给出分数", 1000);
      return;
    }
    
    post("/api/comment", {
      content: value,
      parent: this.props.app_id,
      score: this.props.score,
    })
    .then((res) => {
      this.showMessage("success", "评论成功！", 1000);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  handleClosePopUp(){
    this.setState({
      popupSignIn: false,
    });
  }
  
  render(){
    return (
      <Consumer>
        {(value) => {
          this.showMessage = value;
          return (
            <>
              <PopUpSignIn showPopUpSignIn={this.state.popupSignIn}
                           handleClosePopUp={this.handleClosePopUp.bind(this)}
              />
              <NewPostInput default_text="new comment" button_text="提交"
                            on_submit={this.postNewComment.bind(this)} use_textarea={true}
              />
            </>
          );
        }}
      </Consumer>
    );
  }
}

class NewReply extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      popupSignIn: false,
    };
  }
  
  postNewReply(value){
    if(!getLoggedInfo()){
      this.showMessage("fail", "请先登陆", 1000);
      this.setState({
        popupSignIn: true,
      });
      return;
    }
    console.log("value: "+value);
    if(!value || value == ""){
      this.showMessage("fail", "回复内容不能为空", 1000);
      return;
    }
    
    post("/api/reply", {
      content: value,
      parent: this.props.commentId,
    })
    .then((res) => {
      this.showMessage("success", "回复成功", 1000);
    })
    .catch((error) => {
      console.log(error)
    });
  }
  
  handleClosePopUp(){
    this.setState({
      popupSignIn: false,
    });
  }
  
  render(){
    return (
      <Consumer>
       {(value) => {
         this.showMessage = value;
         return (
           <>
             <PopUpSignIn showPopUpSignIn={this.state.popupSignIn}
                          handleClosePopUp={this.handleClosePopUp.bind(this)}
             />
             <NewPostInput default_text="new reply" button_text="提交"
                           on_submit={this.postNewReply.bind(this)} use_textarea={true}
             />
           </>
         );
       }}
      </Consumer>
    );
  }
}


export default NewPostInput;
export { SearchPostInput, NewComment, NewReply };

