import React, { Component } from "react";

import SingleDownloadFile from "./SingleDownloadFile.js";

class AppDownloadPage extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="download-page">
        下载列表
        <SingleDownloadFile platform="Windows" downloadUrl="www.baidu.com" uploadedDate="2023-11-13" />
      </div>
    );
  }
}

export default AppDownloadPage;

