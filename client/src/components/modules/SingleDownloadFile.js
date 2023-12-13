import React, { Component } from "react";

class SingleDownloadFile extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <>
        <div className="platform">{this.props.platform}</div>
        <div className="filename">{this.props.name}</div>
        <div className="upload-date">{this.props.uploadedDate}</div>
        <div className="download-button">
          <a href={this.props.downloadUrl}>
            <button>
              download!
            </button>
          </a>
        </div>
      </>
    );
  }
}

export default SingleDownloadFile;

