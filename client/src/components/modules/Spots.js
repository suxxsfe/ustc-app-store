import React, { Component } from "react";

class Spots extends Component{
  constructor(props){
    super(props);
  }

  getSingleSpot(id, focus_id){
    if(id == focus_id){
      return (
        <div className="single-spot u-inlineblock focus-spot"></div>
      );
    }
    return (
      <div className="single-spot u-inlineblock unfocus-spot"></div>
    );
  }
  
  render(){
    let spots = [];
    for(let i = 0; i < this.props.spot_num; i = i+1){
      spots.push(this.getSingleSpot(i, this.props.focus_spot_id));
    }
    
    return (
      <div className="spots">
        {spots}
      </div>
    );
  }
}

export default Spots;

