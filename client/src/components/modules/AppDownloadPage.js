import React, { Component } from "react";

import SingleDownloadFile from "./SingleDownloadFile.js";

class AppDownloadPage extends Component{
  constructor(props){
    super(props);
	this.state = {
	  donwloadList,
	};
  }
	
  componentDidMount(){
	get("/api/appdonwload", {_id: this.props.appId}).then((list) => {
	  this.setState({
		donwloadList: list,
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
			this.state.donwloadList.map((item) => {
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

