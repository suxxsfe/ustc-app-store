import React, { Component } from "react";

import SingleRollingPicture from "./SingleRollingPicture.js";
import Spots from "./Spots.js";
import ArrowButton from "./ArrowButton.js";

import "./RollingPictures.css";

class RollingPictures extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentPicture: 0,// [0, size-1]
      useTransition: true,
    };
    
    this.currentImplementedPicture = 0,// [2, size+1]
    this.size = 0;
    this.pictureComponents = null;
    this.singlePictureWidth = null;
  }

  urlToComponent(url){
    return (
      <SingleRollingPicture url={url} />
    );
  }
  
  setPicture(shift, ele){
    this.setState({
      currentPicture: (this.state.currentPicture+shift+this.size)%this.size,
    });
    this.currentImplementedPicture+=shift;
    ele.style.transition = "0.8s 0s left ease-out";
    ele.style.left = this.getPositionLeft();
  }
  buttonOnClick(shift, ele){
    if(this.currentImplementedPicture === 0
       || this.currentImplementedPicture === this.size+2){
      if(this.singlePictureWidth === null){
        this.singlePictureWidth = ele.children[0].offsetWidth+20;
        console.log(ele.children[0]);
        console.log(this.singlePictureWidth);
      }
      
      this.currentImplementedPicture = this.currentImplementedPicture === 0 ? (this.size) : 2;
      ele.style.transition = "0s";
      ele.style.left = this.getPositionLeft();
      window.getComputedStyle(ele).transition;
    }
    this.setPicture(shift, ele);
  }
  leftButonOnClick(event){
    this.buttonOnClick(-1, event.target.previousElementSibling.children[0]);
  }
  rightButtonOnClick(event){
    this.buttonOnClick(1, event.target.previousElementSibling.previousElementSibling.children[0]);
  }
  
  getPositionLeft(){
    let a = "-"+this.singlePictureWidth*this.currentImplementedPicture+"px";
    console.log(a);
    return a;
  }
  
  componentDidMount(){
    this.pictureComponents = this.props.pictures.map(this.urlToComponent);
    this.size = this.pictureComponents.length;
    
    this.pictureComponents.unshift(this.urlToComponent(this.props.pictures[this.size-1]));
    this.pictureComponents.unshift(this.urlToComponent(this.props.pictures[this.size-2]));
    this.pictureComponents.push(this.urlToComponent(this.props.pictures[0]));
    this.pictureComponents.push(this.urlToComponent(this.props.pictures[1]));
    
  }
  
  render(){
    return (
      <div className="rolling-pictures">
        <div className="rolling-hide-container">
          <div className="rolling-container">
            {this.pictureComponents}
          </div>
        </div>
        <ArrowButton _onclick={this.leftButonOnClick.bind(this)} direction="left" />
        <ArrowButton _onclick={this.rightButtonOnClick.bind(this)} direction="right" />
        <Spots spot_num={this.size} focus_spot_id={this.state.currentPicture}/>
      </div>
    );
  }
}

export default RollingPictures;

