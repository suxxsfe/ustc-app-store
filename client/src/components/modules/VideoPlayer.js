import React, { Component } from "react";

class VideoPlayer extends Component{
  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.async = false;
    script.defer = false;
    script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    document.head.appendChild(script);
    
    script.onload = () => {
      if(Hls.isSupported()){
        const video = document.getElementsByClassName("hls-player")[0];
        console.log(video);
        let hls = new Hls();
        hls.loadSource(this.props.videoSrc);
        hls.attachMedia(video);
      }
    }
  }

  render(){
    return (
      <video className="hls-player" controls />
    );
  }
}

export default VideoPlayer;

