import React, { Component } from "react";

class SingleDownloadFile extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="download-file">
        <ul>
          <li>{this.props.platform}</li>
          <li>{this.props.uploadedDate}</li>
          <li>
            <a href={this.props.downloadUrl}>
              <button>
                download!
              </button>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SingleDownloadFile;

