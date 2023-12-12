import React, { Component } from "react";

import { post,get } from "../../utilities.js";

class NewProject extends Component{
  constructor(props){
    super(props);
    this.state = {
      _id: undefined,
      name: "",
      description: "",
      tags: [],
      selectedTags: [],
      platforms: [{name: "Web"}, {name: "Windows"}, {name: "MacOS"}, {name: "Linux"}],
      selectedPlatforms: [],
      links: [],
      donwloads: [],
      logo: "",
    }
  }

  componentDidMount(){
	  get("/api/tags").then((tags) => {
      console.log(tags)
	    this.setState({
    		tags: tags,
	    });
  	});
    
    if(this.props.appId === undefined){
      return;
    }
    get("/api/appinfo", {_id: this.props.appId})
    .then((info) => {
      console.log(info);
      this.setState({
        name: info.name,
        description: info.describe,
        tags: [],
        selectedTags: info.tags.map((tag) => tag._id),
        platforms: [{name: "Web"}, {name: "Windows"}, {name: "MacOS"}, {name: "Linux"}],
        selectedPlatforms:info.platforms,
        links: info.links.map((link) => ({name: link.name, url: link.url, givenId: Math.random()})),

        downloads: info.downloads,
        logo: info.logo,
      });
    })
    .catch((error) => console.log(error));
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
  
  handleSelectTags(tagId, event){
    this.setState((preState) => ({
      selectedTags: preState.selectedTags.indexOf(tagId) === -1 ?
                    [...preState.selectedTags, tagId] :
                    preState.selectedTags.filter((tag) => (tag !== tagId)),
    }));
  }
  handleSelectPlatforms(platform, event){
    this.setState((preState) => ({
      selectedPlatforms: preState.selectedPlatforms.indexOf(platform) === -1 ?
                         [...preState.selectedPlatforms, platform] :
                         preState.selectedPlatforms.filter((pl) => (pl !== platform)),
    }));
  }
  isTagSelected(tagId){
    return this.state.selectedTags.indexOf(tagId) !== -1;
  }
  isPlatformSelected(platform){
    return this.state.selectedPlatforms.indexOf(platform) !== -1;
  }
  
  handleLinkDelete(givenId, event){
    this.setState((preState) => ({
      links: preState.links.filter((link) => (link.givenId !== givenId)),
    }));
  }
  handleLinkNameChange(givenId, event){
    var __gloableLinkNameValue = event.target.value;
    this.setState((preState) => ({
      links: preState.links.map((link) => (link.givenId === givenId ?
                                           {name: __gloableLinkNameValue, url: link.url, givenId: givenId} :
                                           link)),
    }));
  }
  handleLinkUrlChange(givenId, event){
    var __gloableLinkUrlValue = event.target.value;
    this.setState((preState) => ({
      links: preState.links.map((link) => (link.givenId === givenId ?
                                           {name: link.name, url: __gloableLinkUrlValue, givenId: givenId} :
                                           link)),
    }));
  }
  handleNewLink(event){
    this.setState((preState) => ({
      links: [...preState.links, {name: "", url: "", givenId: Math.random()}],
    }));
  }
  
  getFile(event){
    console.log(event.target.parentNode.children);
    const fileInput = Array.prototype.slice.call(event.target.parentNode.children)
                      .filter((bro) => bro.classList.contains("file-input"))[0];
    fileInput.click();
  }
  handleLogoChange(event){
    const fileData = event.target.files[0];
    if(fileData){
      const formData = new FormData();
      formData.append("_id", this.props.appId);
      formData.append("file", fileData);
      formData.append("Authorization", "Bearer"+localStorage.getItem("token"));
      post("/api/appinfo/logo", formData, true)
      .then((res) => {
        console.log("上传成功");
        console.log(res);
        this.setState({
          logo: res.logo,
        });
      })
      .catch((error) => {
        console.log("上传失败: "+error);
      });
    }
  }
  
  submit(){
    post("/api/appinfo", {
      _id: this.props.appId,
      name: this.state.name,
      description: this.state.description,
      tags: this.state.selectedTags,
      platforms: this.state.selectedPlatforms,
      links: this.state.links.map((link) => ({webname: link.name, url: link.url}))
                             .filter((link) => (link.webname !== "" && link.url !== "")),
      donwloads: [],
      Authorization: "Bearer "+localStorage.getItem("token"),
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
      
        <div className="new-app-logo">
          <div className="current-logo">
            <img src={"/"+this.state.logo} />
          </div>
          <input type="file" accept="image/*"
                 style={{display:"none"}} className="file-input"
                 onChange={this.handleLogoChange.bind(this)}
                 encType="multipart/form-data"
          />
          <button className="new-app-logo-upload"
                  onClick={this.getFile.bind(this)}
          >
            上传头像
          </button>
        </div>
      
        <div className="new-app-video">
          <h2>App video</h2>
          TODO
        </div>
      
        <div className="new-app-description">
          <h2>Description</h2>
          <textarea type="text" placeholder="describe your app"
                    value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}
                    className="new-app-description-input new-post-input-input"
          />
        </div>
      
        <div className="new-app-platforms">
          <h2>select platform</h2>
          {
            this.state.platforms.map((pl) => (
              <div className="select-box">
                <label>{pl.name}</label>
                <input type="checkbox" name="platform" value={pl.name}
                       onChange={this.handleSelectPlatforms.bind(this, pl.name)}
                       defaultChecked={this.isPlatformSelected(pl.name)}
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
                <span>{tag.name}</span>
                <input type="checkbox" name="tag" value={tag._id}
                       onChange={this.handleSelectTags.bind(this, tag._id)}
                       defaultChecked={this.isTagSelected(tag._id)}
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
                           placeholder="describe your link"
                           onChange={this.handleLinkNameChange.bind(this, link.givenId)}
                    />
                    <input type="text" value={link.url} className="new-link-item"
                           placeholder="link address"
                           onChange={this.handleLinkUrlChange.bind(this, link.givenId)}
                    />
                    <button value="Delete" className="new-link-item"
                           onClick={this.handleLinkDelete.bind(this, link.givenId)}
                    />
                  </>
                );
              })
            }
            <button className="new-links-button"
                    onClick={this.handleNewLink.bind(this)}
            >
              添加链接
            </button>
          </div>
        </div>
      
        <div className="new-app-downloads">
          <h2>Downloads</h2>
          <span>TODO</span>
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

