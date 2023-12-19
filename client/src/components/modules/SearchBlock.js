import React, { Component } from "react";

import TagsSelection from "../modules/TagsSelection.js";
import { SearchPostInput } from "../modules/PostInput.js";

import { get } from "../../utilities.js";

const TMP_PLATFORMS = [
  {
    name: "Web",
  },
  {
    name: "Windows",
  },
  {
    name: "MacOS",
  },
  {
    name: "Linux",
  },
];

const INIT_TAG_NAME = "all";
const INIT_PLATFORM_NAME = "all";

class SearchBlock extends Component{
  constructor(props){
    super(props);
    this.state = {
      tags: [],
      selectedTag: INIT_TAG_NAME,
      selectedPlatform: INIT_PLATFORM_NAME,
    };
  }
  
  handleTagSelection(tag){
    this.setState((preState) => ({
      selectedTag: preState.selectedTag === tag ? INIT_TAG_NAME : tag,
    }));
  }
  
  handlePlatformSelection(platform){
    this.setState((preState) => ({
      selectedPlatform: preState.selectedPlatform === platform ? INIT_PLATFORM_NAME : platform,
    }));
  }
	
  componentDidMount(){
	  get("/api/tags").then((tags) => {
	    this.setState({
    		tags: tags,
	    });
  	});
  }

  render(){
    return (
      <div className="search-block">
        <h1 className="search-block-title">搜索</h1>
        <SearchPostInput selected_tag={this.state.selectedTag} 
                         selected_platform={this.state.selectedPlatform} 
                         giveResult={this.props.giveResult}
        />
        <TagsSelection handle_selection={this.handleTagSelection.bind(this)}
                       selected_tag={this.state.selectedTag}
                       tags_name={this.state.tags} tags_title="Tags"
        />
        <TagsSelection handle_selection={this.handlePlatformSelection.bind(this)}
                       selected_tag={this.state.selectedPlatform}
                       tags_name={TMP_PLATFORMS} tags_title="Platforms"
        />
      </div>
    );
  }
}

export default SearchBlock;

