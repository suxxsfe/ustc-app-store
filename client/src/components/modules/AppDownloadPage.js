import React, { Component } from "react";

import SingleDownloadFile from "./SingleDownloadFile.js";

class AppDownloadPage extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="download-page sub-page-main">
        下载列表
        <div className="download-container">
          <div className="platform download-title">platform</div>
          <div className="upload-date download-title">upload date</div>
          <div className="download-button download-title">download</div>
          <SingleDownloadFile platform="Windows" downloadUrl="www.baidu.com" uploadedDate="2023-11-13" />
        </div>
      </div>
    );
  }
}

export default AppDownloadPage;

