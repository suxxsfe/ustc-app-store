import React, { Component } from "react";

import { post,get } from "../../utilities.js";

class NewProject extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      tags: [],
      selectedTags: this.props.selected_tags,
      platforms: [{name: "Web"}, {name: "Windows"}, {name: "MacOS"}, {name: "Linux"}],
      selectedPlatforms:this.props.selected_platforms,
      links: [],
    };
  }

  componentdidmount(){
	  get("/api/tags").then((tags) => {
	    this.setstate({
    		tags: tags,
	    });
  	});
  }
  
  handleNameChange(event){
    this.setState({
      name: event.target.value,
    });
  }
  handleDescriptionChange(event){
    this.setState({
      description: event.target.value,
    });
  }
  
  handleSelectTags(event, tagId){
    this.setState((preState) => ({
      selectedTags: preState.selectedTags.indexOf(tagId) === -1 ?
                    [...preState.selectedTags, tagId] :
                    preState.selectedTags.filter((tag) => (tag !== tagId)),
    }));
  }
  handleSelectPlatforms(event, platform){
    this.setState((preState) => ({
      selectedPlatforms: preState.selectedPlatforms.indexOf(platform) === -1 ?
                         [...preState.selectedPlatforms, platform],
                         preState.selectedPlatforms.filter((pl) => (pl !== platform)),
    }));
  }
  isTagSelected(tagId){
    return this.state.selectedTags.indexOf(tagId) !== -1;
  }
  isPlatformSelected(platform){
    return this.state.selectedPlatforms.indexOf(platform) !== -1;
  }
  
  handleLinkDelete(event, givenId){
    this.setState((preState) => ({
      links: preState.links.filter((link) => (link.givenId !== givenId)),
    }));
  }
  handleLinkNameChange(event, givenId){
    this.setState((preState) => ({
      links: preState.links.map((link) => (link.givenId === givenId ?
                                           {name: event.target.value, url: link.url, givenId: givenId} :
                                           link)),
    }));
  }
  handleLinkUrlChange(event, givenId){
    this.setState((preState) => ({
      links: preState.links.map((link) => (link.givenId === givenId ?
                                           {name: link.name, url: event.target.value, givenId: givenId} :
                                           link));
    }));
  }
  handleNewLink(event){
    this.setState((preState) => ({
      links: [...preState.links, {name: "", url: "", Math.random()}],
    }));
  }
  
  submit(){
    post("/api/appinfo", {
      name: this.state.name,
      description: this.state.description,
      tags: this.state.selectedTags,
      platforms: this.state.selectedPlatforms,
      links: this.state.links.map((link) => ({name: link.name, url: link.url})),
    });
  }
  
  generateSelectBoxes(list, name){
    list.map((ele) => {
      return (
        <div className="select-box">
          <span>{ele.name}</span>
          <input type="checkbox" name={name}
                 value={ele._id} onClick={onclick.bind(this, ele)}
          />
        </div>
      );
    });
  }
  
  render(){
    return (
      <div className="new-app">
        <div className="new-app-name">
          <h2>App name</h2>
          <input type="text" placeholder="your app name"
                 value={this.state.name} onChange={this.handleNameChange.bind(this)}
                 className="new-app-name-input new-post-input-input"
          />
        </div>
        <div className="new-app-video">
          <h2>App video</h2>
          TODO
        </div>
        <div className="new-app-description">
          <h2>Description<h2>
          <textarea type="text" placeholder="describe your app"
                    value={this.state.name} onChange={this.handleDescriptionChange.bind(this)}
                    className="new-app-description-input new-post-input-input"
          />
        </div>
        <div className="new-app-platforms">
          <h2>select platform</h2>
          {
            this.state.platforms.map((pl) => (
              <div className="select-box">
                <span>pl.name</span>
                <input type="checkbox" name="platform" value={pl.name}
                       onClick={this.handleSelectPlatforms.bind(this, pl.name)}
                       checked={this.isPlatformSelected(pl.name) ? "yes" : "no"}
                />
              </div>
            ))
          }
        </div>
        <div className="new-app-tags">
          <h2>select tags</h2>
          {
            this.state.tags.map((tag) => (
              <div className="select-box">
                <span>tag.name</span>
                <input type="checkbox" name="tag" value={tag._id}
                       onClick={this.handleSelectTags.bind(this, tag._id)}
                       checked={this.isTagSelected(tag._id) ? "yes" : "no"}
                />
              </div>
            ))
          }
        </div>
        <div className="new-app-links">
          <h2>relative links</h2>
          <div className="new-links-container">
            <div className="new-links-title">链接名称</div>
            <div className="new-links-title">链接地址</div>
            <div className="new-links-title">操作</div>
            {
              this.state.links.map((link) => {
                return (
                  <>
                    <input type="text" value={link.name} className="new-link-item"
                           onChange={this.handleLinkNameChange.bind(this, link.givenId)}
                    />
                    <input type="text" value={link.url} className="new-link-item"
                           onChange={this.handleLinkUrlChange.bind(this, link.givenId)}
                    />
                    <button value="Delete" className="new-link-item"
                           onClick={this.handleLinkDelete.bind(this, link.givenId)}
                  </>
                );
              })
            }
            <button className="new-links-button"
                    onClick={handleNewLink.bind(this)}
            >
              添加链接
            </button>
          </div>
        </div>
        <div className="new-app-submit">
          <button type="submit" value="Submit"
                  className="new-post-input-button new-app-submit-button"
                  onClick={this.submit.bind(this)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default NewProject;

