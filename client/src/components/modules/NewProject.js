import React, { Component } from "react";

import { post,get } from "../../utilities.js";
import { Consumer } from "../pages/Root.js";

import "./Settings.css";

class NewProject extends Component{
  constructor(props){
    super(props);
    this.state = {
      _id: undefined,
      name: "",
      description: "",
      tags: [],
      selectedTags: [],
      platforms: ["Web", "Windows", "MacOS", "Linux"],
      selectedPlatforms: [],
      links: [],
      downloads: [],
      logo: "",
      videoname: "",
      web: "",
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
        platforms: ["Web", "Windows", "MacOS", "Linux"],
        selectedPlatforms:info.platforms,
        links: info.links.map((link) => ({name: link.webname, url: link.url, givenId: Math.random()})),

        downloads: info.downloads,
        logo: "upload/applogo/"+this.props.appId,
        videoname: info.videoname,
        web: info.web,
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
    return this.state.selectedPlatforms.indexOf(platform) !== -1 ? true : false;
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
  
  handleWebChange(event){
    this.setState({
      web: event.target.value,
    });
  }
  
  handleNewDownload(event){
    this.setState((preState) => ({
      downloads: [...preState.downloads, {platform: "Windows", filename: "", id: (Math.random()+"").split('.')[1]}],
    }));
  }
  handleDownloadDelete(id, event){
    post("/api/appinfo/deletedownload", {
      _id: this.props.appId,
      id: id,
    })
    .then((res) => {
      this.setState((preState) => ({
        downloads: preState.downloads.filter((download) => (download.id !== id)),
      }));
    });
  }
  handleDownloadPlatformChange(id, event){
    var __gloableDownloadPlatform = event.target.value;
    this.setState((preState) => ({
      downloads: preState.downloads.map((download) => (download.id === id ?
                                                       {platform: __gloableDownloadPlatform, filename: download.filename, id: download.id, file: download.file} :
                                                       download)),
    }));
  }
  handleDownloadFileChange(id, event){
    var __gloableDownloadFile = event.target.files[0];
    this.setState((preState) => ({
      downloads: preState.downloads.map((download) => (download.id === id ?
                                                       {platform: download.platform, filename: __gloableDownloadFile.name,
                                                        file: __gloableDownloadFile, id: download.id} :
                                                       download)),
    }));
  }
  handleDownloadSubmit(id, event){
    let download = this.state.downloads.filter((download) => (download.id === id))[0];
    if(!download){
      return;
    }
    if(!download.file || !download.platform || !download.id || !download.filename){
      return;
    }
    const formData = new FormData();
    formData.append("id", download.id);
    formData.append("platform", download.platform);
    this.uploadFile("/api/appinfo/download", download.file, (res) => {
      console.log("更改成功");
    }, formData);
  }
  
  getFile(event){
    console.log(event.target.parentNode.children);
    const fileInput = Array.prototype.slice.call(event.target.parentNode.children)
                      .filter((bro) => bro.classList.contains("file-input"))[0];
    fileInput.click();
  }
  uploadFile(api, fileData, func, formData = new FormData()){
    if(fileData){
      formData.append("_id", this.props.appId);
      formData.append("file", fileData);
      post(api, formData, true)
      .then((res) => {
        console.log("上传成功");
        func(res);
      })
      .catch((error) => {
        console.log("上传失败: "+error);
        this.showMessage("fail", "上传失败", 1000);
      });
    }
  }
  handleLogoChange(event){
    this.uploadFile("/api/appinfo/logo", event.target.files[0], (res) => {
      this.setState({
        logo: "upload/applogo/"+this.props.appId+"?"+Math.random(),
      });
    });
  }
  handleVideoChange(event){
    this.uploadFile("/api/appinfo/video", event.target.files[0], (res) => {
      console.log(res);
      this.setState({
        videoname: res.videoname,
      });
    });
  }
  
  submit(showMessage){
    console.log(this.state.links);
    if(this.state.links.filter((link) => (!link.name || !link.url || link.name == "" || link.url == "")).length > 0){
      this.showMessage("fail", "链接名或地址不能为空", 1000);
      return;
    }
    
    post("/api/appinfo", {
      _id: this.props.appId,
      name: this.state.name,
      description: this.state.description,
      tags: this.state.selectedTags,
      platforms: this.state.selectedPlatforms,
      links: this.state.links.map((link) => ({webname: link.name, url: link.url})),
      downloads: [],
      web: this.state.web,
    })
    .then((app) => {
      if(this.props.successSetHook){
        this.props.successSetHook(app._id);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    
  }
  
  render(){
    const name = (
        <div className="new-app-name">
          <h2>项目名</h2>
          <input type="text" placeholder="your app name"
                 value={this.state.name} onChange={this.handleNameChange.bind(this)}
                 className="new-app-name-input new-post-input-input"
          />
        </div>
    );
    
    const logo = (
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
    );
    
    const video = (
        <div className="new-app-video">
          <h2>项目宣传视频</h2>
          {this.state.videoname && (<p>{this.state.videoname}</p>)}
          <input type="file" accept="video/*"
                 style={{display:"none"}} className="file-input"
                 onChange={this.handleVideoChange.bind(this)}
                 encType="multipart/form-data"
          />
          <button className="new-app-logo-upload"
                  onClick={this.getFile.bind(this)}
          >
            上传视频
          </button>
        </div>
    );
    
    const downloads = (
        <div className="new-app-downloads">
          <h2>管理下载项</h2>
          <div className="new-downloads-container">
            <div className="new-downloads-title">运行平台</div>
            <div className="new-downloads-title">文件名</div>
            <div className="new-downloads-title">操作</div>
            {
              this.state.downloads.map((item) => (
                <>
                  <div className="new-download-content">
                    <select name="platform" className="new-download-select"
                            value={item.platform} onChange={this.handleDownloadPlatformChange.bind(this, item.id)}
                    >
                      <option value="Windows">Windows</option>
                      <option value="MacOS">MacOS</option>
                      <option value="Linux">Linux</option>
                    </select>
                  </div>
                  <div className="new-download-content">
                    <span style={{fontSize: "16px"}}>{item.filename}</span>
                  </div>
                  <div className="new-download-content">
                    <button value="Delete" className="new-download-action"
                            onClick={this.handleDownloadDelete.bind(this, item.id)}
                    >
                      删除
                    </button>
                    <input type="file" accept="application/*"
                           style={{display:"none"}} className="file-input"
                           onChange={this.handleDownloadFileChange.bind(this, item.id)}
                           encType="multipart/form-data"
                    />
                    <button value="ChangeFile" className="new-download-action"
                            onClick={this.getFile.bind(this)}
                    >
                      选择文件
                    </button>
                    <button value="Submit" className="new-download-action"
                            onClick={this.handleDownloadSubmit.bind(this, item.id)}
                    >
                      确认更改
                    </button>
                  </div>
                </>
              ))
            } 
            <button className="new-download-button"
                    onClick={this.handleNewDownload.bind(this)}
            >
              添加下载项
            </button>
          </div>
        </div>
    );
    
    const web = (
      <div classname="new-app-web">
        <h2>项目 Web 端地址</h2>
        <p>不支持 Web 端则留空</p>
        <input type="text" placeholder="web url"
               value={this.state.web} onChange={this.handleWebChange.bind(this)}
               className="new-app-web-input new-post-input-input"
        />
      </div>
    );
    
    const describe = (
        <div className="new-app-description">
          <h2>项目描述</h2>
          <p>支持 markdown</p>
          <textarea type="text" placeholder="describe your app"
                    value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}
                    className="new-app-description-input new-post-input-input"
          />
        </div>
    );
    
    const selections = (
      <>
        <div className="new-app-platforms">
          <h2>选择支持的平台</h2>
          {
            this.state.platforms.map((pl) => (
              <div className="select-box">
                <label>{pl}</label>
                <input type="checkbox" name="platform" value={pl+"pl"}
                       onChange={this.handleSelectPlatforms.bind(this, pl)}
                       checked={this.isPlatformSelected(pl)}
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
                       checked={this.isTagSelected(tag._id)}
                />
              </div>
            ))
          }
        </div>
      </>
    );
    
    const links = (
        <div className="new-app-links">
          <h2>相关链接</h2>
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
    );
    
    return (
      <Consumer>
       {(value) => {
         this.showMessage = value;
         return (
           <div className="new-app">
             
             {this.props.appId ? (
               <h1 className="page-title">
                 {"管理项目 "+this.state.name}
               </h1>
             ) : (
               <h1 className="page-title">
                 {"创建新项目"}
               </h1>
             )}
           
             <div className="settings">
               {this.props.appId ? null : name}
             
               {this.props.appId ? (
                 <>
                   {logo}
                   {video}
                   {downloads}
                   {web}
                 </>
               ): null}
             
               {describe}
               
               {this.props.appId ? (
                 <>
                   {selections}
                   {links}
                 </>
               ) : null}
             
               <div className="new-app-submit">
                 <button type="submit" value="Submit"
                         className="new-post-input-button new-app-submit-button"
                         onClick={this.submit.bind(this)}
                 >
                   Submit
                 </button>
               </div>
             </div>
           </div>
         )
       }}
      </Consumer>
    );
  }
}

export default NewProject;

