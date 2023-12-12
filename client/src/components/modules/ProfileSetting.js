import React, { Component } from "react";

import { post } from "../../utilities.js";

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
    //get
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
      formData.append("Authorization", "Bearer"+localStorage.getItem("token"));
      post("/api/userinfo/logo", formData, true)
      .then((res) => {
        console.log("上传成功");
        this.setState({
          logo: res.logo,
        });
      })
      .catch((error) => console.log("上传失败: "+error));
    }
  }

  render(){
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
      </div>
    );
  }
}

export default ProfileSetting;

