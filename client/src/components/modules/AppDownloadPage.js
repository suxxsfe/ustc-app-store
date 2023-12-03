import React, { Component } from "react";

import SingleDownloadFile from "./SingleDownloadFile.js";

import { get } from "../../utilities.js";

class AppDownloadPage extends Component{
  constructor(props){
    super(props);
  	this.state = {
      downloadList: [],
  	};
  }
	//get("/api/appdonwload")
  //这个怎么还有折磨多个啊
  componentDidMount(){
	get("/api/appdownload", {_id: this.props.appId}).then((list) => {
	  this.setState({
  		downloadList: list.downloads,
	  });
	});
  }
  
  render(){
    return (
      <div className="download-page sub-page-main">
        下载列表
        <div className="download-container">
          <div className="platform download-title">platform</div>
          <div className="upload-date download-title">upload date</div>
          <div className="download-button download-title">download</div>
		  {
			this.state.downloadList.map((item) => {
			  return (
				<SingleDownloadFile platform={item.platform} uploadedDate={item.updatedate}
				  				    downloadUrl={""}
				/>
			  );
			})
		  }
        </div>
      </div>
    );
  }
}

export default AppDownloadPage;

