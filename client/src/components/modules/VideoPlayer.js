import React, { Component } from "react";

class VideoPlayer extends Component{
  constructor(props){
    super(props);
  }
  
  componentDidUpdate(){
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.async = false;
    script.defer = false;
    script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    document.head.appendChild(script);
    script.onload = () => {
      if(Hls.isSupported()){
        const video = document.getElementsByClassName("hls-player")[0];
        let hls = new Hls();
        hls.loadSource(this.props.videoSrc);
        hls.attachMedia(video);
      }
    }
  }

  render(){
    return (this.props.videoSrc && this.props.videoSrc != "" && this.props.videoSrc != "/") &&
      <video className="hls-player" controls />
  }
}

export default VideoPlayer;

