import React, { Component } from "react";

import { get, post } from "../../utilities.js";
import { Consumer } from "../pages/Root.js";

class ProfileSetting extends Component{
  constructor(props){
    super(props);
    this.state = {
      intro: "",
      links: [],
      logo: "",
    };
  }
  
  componentDidMount(){
    get("/api/userinfo", {_id: this.props.userId})
    .then((info) => {
      this.setState({
        intro: info.intro,
        logo: "upload/userlogo/"+this.props.userId,
        links: info.links.map((link) => ({name: link.webname, url: link.url, givenId: Math.random()})),
      });
    })
  }
  
  handleIntroChange(event){
    this.setState({
      intro: event.target.value,
    });
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
      formData.append("_id", this.props.userId);
      formData.append("file", fileData);
      post("/api/userinfo/logo", formData, true)
      .then((res) => {
        console.log("上传成功");
        this.setState({
          logo: "upload/userlogo/"+this.props.userId+"?"+Math.random(),
        });
      })
      .catch((error) => {
        console.log("上传失败: "+error);
        this.showMessage("fail", "上传失败", 1000);
      });
    }
  }
  
  submit(){
    if(this.state.links.filter((link) => (!link.name || !link.url || link.name == "" || link.url == "")).length > 0){
      this.showMessage("fail", "链接名或地址不能为空", 1000);
      return;
    }
    
    post("/api/userinfo", {
      _id: this.props.userId,
      intro: this.state.intro,
      links: this.state.links.map((link) => ({webname: link.name, url: link.url})),
    })
    .then((user) => {
      if(this.props.successSetHook){
        this.props.successSetHook(user._id);
      }
    })
    .catch((error) => {
      console.log("修改失败: "+error);
      this.showMessage("fail", "修改失败", 1000);
    })
  }

  render(){
    return (
      <Consumer>
        {(value) => {
          this.showMessage = value;
          return (
            <div className="user-settings">
              <div className="user-logo">
                <div className="current-logo">
                  <img src={"/"+this.state.logo} />
                </div>
                <input type="file" accept="image/*"
                       style={{display:"none"}} className="file-input"
                       onChange={this.handleLogoChange.bind(this)}
                       encType="multipart/form-data"
                />
                <button className="user-logo-upload"
                        onClick={this.getFile.bind(this)}
                >
                  上传头像
                </button>
              </div>
            
              <div className="user-settings-intro">
                <h2>个人介绍</h2>
                <textarea type="text" placeholder="introduce your self"
                          value={this.state.intro} onChange={this.handleIntroChange.bind(this)}
                          className="user-settings-input new-post-input-input"
                />
              </div>
            
              <div className="user-settings-links">
                <h2>个人链接</h2>
                <div className="new-links-container">
                  <div className="new-links-title">链接名称</div>
                  <div className="new-links-title">链接地址</div>
                  <div className="new-links-title">操作</div>
                  {
                    this.state.links.map((link) => {
                      return (
                        <>
                          <div className="new-link-item">
                            <input type="text" value={link.name}
                                   placeholder="describe your link"
                                   onChange={this.handleLinkNameChange.bind(this, link.givenId)}
                            />
                          </div>
                          <div className="new-link-item">
                            <input type="text" value={link.url}
                                   placeholder="link address"
                                   onChange={this.handleLinkUrlChange.bind(this, link.givenId)}
                            />
                          </div>
                          <div className="new-link-item">
                            <button value="Delete"
                                   onClick={this.handleLinkDelete.bind(this, link.givenId)}
                            >
                              删除
                            </button>
                          </div>
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
            
              <div className="user-settings-submit">
                <button type="submit" value="Submit"
                        className="new-post-input-button user-settings-submit-button"
                        onClick={this.submit.bind(this)}
                >
                  Submit
                </button>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default ProfileSetting;

